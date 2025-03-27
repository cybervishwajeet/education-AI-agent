import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizAttempt:
 *       type: object
 *       required:
 *         - userId
 *         - quizId
 *         - answers
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID who attempted the quiz
 *         quizId:
 *           type: string
 *           description: Quiz ID that was attempted
 *         answers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *               userAnswer:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *           description: User's answers to quiz questions
 *         score:
 *           type: number
 *           description: Quiz score (percentage)
 *         timeTaken:
 *           type: number
 *           description: Time taken to complete the quiz (in seconds)
 *         completed:
 *           type: boolean
 *           description: Whether the quiz was completed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Attempt creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Attempt last update timestamp
 */
const QuizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Quiz",
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        userAnswer: {
          type: String,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    timeTaken: {
      type: Number, // in seconds
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const QuizAttempt = mongoose.model("QuizAttempt", QuizAttemptSchema);

export default QuizAttempt;
