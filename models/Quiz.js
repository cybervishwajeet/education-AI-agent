import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizQuestion:
 *       type: object
 *       required:
 *         - question
 *         - options
 *         - correctAnswer
 *       properties:
 *         question:
 *           type: string
 *           description: The quiz question
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Multiple choice options
 *         correctAnswer:
 *           type: string
 *           description: The correct answer
 *         explanation:
 *           type: string
 *           description: Explanation for the correct answer
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           description: Question difficulty level
 *
 *     Quiz:
 *       type: object
 *       required:
 *         - title
 *         - topic
 *         - questions
 *       properties:
 *         title:
 *           type: string
 *           description: Quiz title
 *         topic:
 *           type: string
 *           description: Quiz topic
 *         description:
 *           type: string
 *           description: Quiz description
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizQuestion'
 *           description: Array of quiz questions
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           description: Overall quiz difficulty
 *         timeLimit:
 *           type: number
 *           description: Time limit in minutes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Quiz creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Quiz last update timestamp
 */
const QuizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: [QuizQuestionSchema],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    timeLimit: {
      type: Number, // in minutes
      default: 10,
    },
  },
  {
    timestamps: true,
  },
);

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;
