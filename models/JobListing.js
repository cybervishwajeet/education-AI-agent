import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     JobListing:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - company
 *       properties:
 *         title:
 *           type: string
 *           description: Job title
 *         description:
 *           type: string
 *           description: Job description
 *         company:
 *           type: string
 *           description: Company name
 *         location:
 *           type: string
 *           description: Job location
 *         salary:
 *           type: string
 *           description: Salary range
 *         type:
 *           type: string
 *           enum: [full-time, part-time, contract, internship]
 *           description: Job type
 *         requiredSkills:
 *           type: array
 *           items:
 *             type: string
 *           description: Required skills for the job
 *         educationLevel:
 *           type: string
 *           description: Required education level
 *         experienceLevel:
 *           type: string
 *           description: Required experience level
 *         applicationUrl:
 *           type: string
 *           description: URL to apply for the job
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Job listing creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Job listing last update timestamp
 */
const JobListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    salary: {
      type: String,
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    requiredSkills: [
      {
        type: String,
      },
    ],
    educationLevel: {
      type: String,
    },
    experienceLevel: {
      type: String,
    },
    applicationUrl: {
      type: String,
    },
    suitabilityScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
);

const JobListing = mongoose.model("JobListing", JobListingSchema);

export default JobListing;
