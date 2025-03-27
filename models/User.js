import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - uid
 *         - email
 *         - displayName
 *       properties:
 *         uid:
 *           type: string
 *           description: Firebase UID
 *         email:
 *           type: string
 *           description: User email
 *         displayName:
 *           type: string
 *           description: User display name
 *         photoURL:
 *           type: string
 *           description: User profile photo URL
 *         educationField:
 *           type: string
 *           description: User's field of education
 *         educationLevel:
 *           type: string
 *           enum: [school, undergraduate, graduate, postgraduate]
 *           description: User's education level
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: User's skills
 *         preferences:
 *           type: object
 *           properties:
 *             theme:
 *               type: string
 *               enum: [light, dark, system]
 *               default: dark
 *             language:
 *               type: string
 *               default: en
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update timestamp
 */
const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    educationField: {
      type: String,
      default: "Computer Science",
    },
    educationLevel: {
      type: String,
      enum: ["school", "undergraduate", "graduate", "postgraduate"],
      default: "undergraduate",
    },
    skills: [
      {
        type: String,
      },
    ],
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "dark",
      },
      language: {
        type: String,
        default: "en",
      },
    },
    progress: {
      courseProgress: {
        type: Number,
        default: 0,
      },
      quizCompletion: {
        type: Number,
        default: 0,
      },
      resourcesAccessed: {
        type: Number,
        default: 0,
      },
      certificatesEarned: {
        type: Number,
        default: 0,
      },
      weeklyGoalProgress: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

export default User;
