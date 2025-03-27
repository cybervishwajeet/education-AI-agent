import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import JobListing from "../models/JobListing.js";
import User from "../models/User.js";
import { generateJobRecommendations } from "../utils/openai.js";

const router = express.Router();

/**
 * @swagger
 * /api/jobs/recommendations:
 *   get:
 *     summary: Get AI-powered job recommendations
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job recommendations retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/recommendations", verifyToken, async (req, res) => {
  try {
    // Get user profile for personalized recommendations
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has skills
    if (!user.skills || user.skills.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Please update your profile with skills to get job recommendations",
      });
    }

    // Generate job recommendations using OpenAI
    const userProfile = {
      skills: user.skills.join(", "),
      experience: "Entry level", // This could be stored in user profile
      education: `${user.educationLevel} in ${user.educationField}`,
      preferences: "Remote work, flexible hours", // This could be stored in user profile
    };

    const jobRecommendations = await generateJobRecommendations(userProfile);

    // Store recommendations in database
    const jobListings = [];

    for (const job of jobRecommendations) {
      const jobListing = new JobListing({
        title: job.title,
        description: job.description,
        company: "AI Recommended",
        location: "Remote",
        requiredSkills: job.requiredSkills,
        suitabilityScore: job.suitabilityScore,
        applicationUrl: "https://example.com/apply",
      });

      await jobListing.save();
      jobListings.push(jobListing);
    }

    res.status(200).json({
      success: true,
      recommendations: jobListings.map((job) => ({
        id: job._id,
        title: job.title,
        description: job.description,
        company: job.company,
        location: job.location,
        requiredSkills: job.requiredSkills,
        suitabilityScore: job.suitabilityScore,
        applicationUrl: job.applicationUrl,
      })),
    });
  } catch (error) {
    console.error("Error generating job recommendations:", error);
    res.status(500).json({
      success: false,
      message: "Error generating job recommendations",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/jobs/all:
 *   get:
 *     summary: Get all job listings
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job listings retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/all", verifyToken, async (req, res) => {
  try {
    // Find all job listings
    const jobListings = await JobListing.find({});

    res.status(200).json({
      success: true,
      jobs: jobListings.map((job) => ({
        id: job._id,
        title: job.title,
        description: job.description,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        requiredSkills: job.requiredSkills,
        educationLevel: job.educationLevel,
        experienceLevel: job.experienceLevel,
        applicationUrl: job.applicationUrl,
        suitabilityScore: job.suitabilityScore,
        createdAt: job.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching job listings",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a specific job listing
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job listing retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job listing not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find job listing
    const jobListing = await JobListing.findById(id);

    if (!jobListing) {
      return res.status(404).json({
        success: false,
        message: "Job listing not found",
      });
    }

    res.status(200).json({
      success: true,
      job: {
        id: jobListing._id,
        title: jobListing.title,
        description: jobListing.description,
        company: jobListing.company,
        location: jobListing.location,
        salary: jobListing.salary,
        type: jobListing.type,
        requiredSkills: jobListing.requiredSkills,
        educationLevel: jobListing.educationLevel,
        experienceLevel: jobListing.experienceLevel,
        applicationUrl: jobListing.applicationUrl,
        suitabilityScore: jobListing.suitabilityScore,
        createdAt: jobListing.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching job listing:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching job listing",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/jobs/apply/{id}:
 *   post:
 *     summary: Apply for a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job application submitted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job listing not found
 *       500:
 *         description: Server error
 */
router.post("/apply/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find job listing
    const jobListing = await JobListing.findById(id);

    if (!jobListing) {
      return res.status(404).json({
        success: false,
        message: "Job listing not found",
      });
    }

    // In a real application, you would store the job application in a database
    // and potentially send an email to the employer

    res.status(200).json({
      success: true,
      message: "Job application submitted successfully",
      applicationUrl: jobListing.applicationUrl,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      success: false,
      message: "Error applying for job",
      error: error.message,
    });
  }
});

export default router;
