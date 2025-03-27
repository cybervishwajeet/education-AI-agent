import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";
import User from "../models/User.js";
import {
  generateQuizQuestions,
  generateAnswerExplanation,
} from "../utils/openai.js";

const router = express.Router();

/**
 * @swagger
 * /api/quiz/generate:
 *   post:
 *     summary: Generate a new quiz using AI
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - topic
 *             properties:
 *               title:
 *                 type: string
 *               topic:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               questionCount:
 *                 type: number
 *                 default: 5
 *     responses:
 *       201:
 *         description: Quiz generated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/generate", verifyToken, async (req, res) => {
  try {
    const {
      title,
      topic,
      description,
      difficulty = "medium",
      questionCount = 5,
    } = req.body;

    // Validate request data
    if (!title || !topic) {
      return res.status(400).json({
        success: false,
        message: "Title and topic are required",
      });
    }

    // Generate quiz questions using OpenAI
    const questions = await generateQuizQuestions(
      topic,
      questionCount,
      difficulty,
    );

    // Create quiz in database
    const quiz = new Quiz({
      title,
      topic,
      description: description || `Quiz about ${topic}`,
      questions,
      difficulty,
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz generated successfully",
      quiz: {
        id: quiz._id,
        title: quiz.title,
        topic: quiz.topic,
        description: quiz.description,
        difficulty: quiz.difficulty,
        questionCount: quiz.questions.length,
      },
    });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({
      success: false,
      message: "Error generating quiz",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/quiz/all:
 *   get:
 *     summary: Get all available quizzes
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quizzes retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/all", verifyToken, async (req, res) => {
  try {
    // Find all quizzes
    const quizzes = await Quiz.find({});

    res.status(200).json({
      success: true,
      quizzes: quizzes.map((quiz) => ({
        id: quiz._id,
        title: quiz.title,
        topic: quiz.topic,
        description: quiz.description,
        difficulty: quiz.difficulty,
        questionCount: quiz.questions.length,
        timeLimit: quiz.timeLimit,
      })),
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching quizzes",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/quiz/{id}:
 *   get:
 *     summary: Get a specific quiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find quiz
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      quiz: {
        id: quiz._id,
        title: quiz.title,
        topic: quiz.topic,
        description: quiz.description,
        difficulty: quiz.difficulty,
        timeLimit: quiz.timeLimit,
        questions: quiz.questions.map((q) => ({
          id: q._id,
          question: q.question,
          options: q.options,
          // Don't send correct answer to client
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching quiz",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/quiz/attempt/{id}:
 *   post:
 *     summary: Submit a quiz attempt
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     userAnswer:
 *                       type: string
 *               timeTaken:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quiz attempt submitted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.post("/attempt/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, timeTaken } = req.body;

    // Validate request data
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers array is required",
      });
    }

    // Find quiz
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Process answers and calculate score
    const processedAnswers = [];
    let correctCount = 0;

    for (const answer of answers) {
      const question = quiz.questions.id(answer.questionId);

      if (question) {
        const isCorrect = question.correctAnswer === answer.userAnswer;
        if (isCorrect) correctCount++;

        processedAnswers.push({
          questionId: answer.questionId,
          userAnswer: answer.userAnswer,
          isCorrect,
        });
      }
    }

    const score = (correctCount / quiz.questions.length) * 100;

    // Create quiz attempt in database
    const quizAttempt = new QuizAttempt({
      userId: req.user.uid,
      quizId: quiz._id,
      answers: processedAnswers,
      score,
      timeTaken: timeTaken || 0,
      completed: true,
    });

    await quizAttempt.save();

    // Update user progress
    const user = await User.findOne({ uid: req.user.uid });
    if (user) {
      // Increment quiz completion percentage
      const newQuizCompletion = Math.min(100, user.progress.quizCompletion + 5);
      user.progress.quizCompletion = newQuizCompletion;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Quiz attempt submitted successfully",
      result: {
        attemptId: quizAttempt._id,
        score,
        correctCount,
        totalQuestions: quiz.questions.length,
        answers: processedAnswers.map((answer) => {
          const question = quiz.questions.id(answer.questionId);
          return {
            questionId: answer.questionId,
            question: question ? question.question : "",
            userAnswer: answer.userAnswer,
            correctAnswer: question ? question.correctAnswer : "",
            isCorrect: answer.isCorrect,
            explanation: question ? question.explanation : "",
          };
        }),
      },
    });
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting quiz attempt",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/quiz/explanation:
 *   post:
 *     summary: Get AI-generated explanation for a quiz answer
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - correctAnswer
 *               - userAnswer
 *             properties:
 *               question:
 *                 type: string
 *               correctAnswer:
 *                 type: string
 *               userAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Explanation generated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/explanation", verifyToken, async (req, res) => {
  try {
    const { question, correctAnswer, userAnswer } = req.body;

    // Validate request data
    if (!question || !correctAnswer || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: "Question, correct answer, and user answer are required",
      });
    }

    // Generate explanation using OpenAI
    const explanation = await generateAnswerExplanation(
      question,
      correctAnswer,
      userAnswer,
    );

    res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error("Error generating explanation:", error);
    res.status(500).json({
      success: false,
      message: "Error generating explanation",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/quiz/user/attempts:
 *   get:
 *     summary: Get all quiz attempts for the current user
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quiz attempts retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/user/attempts", verifyToken, async (req, res) => {
  try {
    // Find all quiz attempts for the user
    const attempts = await QuizAttempt.find({ userId: req.user.uid }).populate(
      "quizId",
      "title topic difficulty",
    );

    res.status(200).json({
      success: true,
      attempts: attempts.map((attempt) => ({
        id: attempt._id,
        quiz: attempt.quizId
          ? {
              id: attempt.quizId._id,
              title: attempt.quizId.title,
              topic: attempt.quizId.topic,
              difficulty: attempt.quizId.difficulty,
            }
          : null,
        score: attempt.score,
        timeTaken: attempt.timeTaken,
        completed: attempt.completed,
        createdAt: attempt.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching quiz attempts",
      error: error.message,
    });
  }
});

export default router;
