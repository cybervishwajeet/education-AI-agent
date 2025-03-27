import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Resume:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - content
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID who owns this resume
 *         title:
 *           type: string
 *           description: Resume title
 *         content:
 *           type: string
 *           description: Resume content generated by AI
 *         education:
 *           type: string
 *           description: Education information
 *         experience:
 *           type: string
 *           description: Work experience information
 *         skills:
 *           type: string
 *           description: Skills information
 *         objective:
 *           type: string
 *           description: Career objective
 *         fileUrl:
 *           type: string
 *           description: URL to the resume file
 *         publicId:
 *           type: string
 *           description: Cloudinary public ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Resume creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Resume last update timestamp
 */
const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    education: {
      type: String,
    },
    experience: {
      type: String,
    },
    skills: {
      type: String,
    },
    objective: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
