import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Resume from "../models/Resume.js";
import User from "../models/User.js";
import { generateResume } from "../utils/openai.js";
import { uploadFile, generatePdfUrl, deleteFile } from "../utils/cloudinary.js";

const router = express.Router();

/**
 * @swagger
 * /api/resume/generate:
 *   post:
 *     summary: Generate a resume using AI
 *     tags: [Resume]
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
 *               - education
 *               - experience
 *               - skills
 *               - objective
 *             properties:
 *               title:
 *                 type: string
 *               education:
 *                 type: string
 *               experience:
 *                 type: string
 *               skills:
 *                 type: string
 *               objective:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resume generated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/generate", verifyToken, async (req, res) => {
  try {
    const { title, education, experience, skills, objective } = req.body;

    // Validate request data
    if (!title || !education || !experience || !skills || !objective) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Get user info for personalization
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate resume content using OpenAI
    const userInfo = {
      name: user.displayName,
      education,
      experience,
      skills,
      objective,
    };

    const resumeContent = await generateResume(userInfo);

    // Create resume in database
    const resume = new Resume({
      userId: user.uid,
      title,
      content: resumeContent,
      education,
      experience,
      skills,
      objective,
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: "Resume generated successfully",
      resume: {
        id: resume._id,
        title: resume.title,
        content: resume.content,
      },
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    res.status(500).json({
      success: false,
      message: "Error generating resume",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/resume/upload/{id}:
 *   post:
 *     summary: Upload a resume to Cloudinary
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resume ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileData
 *             properties:
 *               fileData:
 *                 type: string
 *                 description: Base64 encoded file data
 *     responses:
 *       200:
 *         description: Resume uploaded successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.post("/upload/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { fileData } = req.body;

    // Validate request data
    if (!fileData) {
      return res.status(400).json({
        success: false,
        message: "File data is required",
      });
    }

    // Find resume
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Check if user owns this resume
    if (resume.userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }

    // Upload file to Cloudinary
    const uploadResult = await uploadFile(fileData, "resumes");

    // Update resume with file URL and public ID
    resume.fileUrl = uploadResult.url;
    resume.publicId = uploadResult.public_id;

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      fileUrl: resume.fileUrl,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading resume",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/resume/download/{id}:
 *   get:
 *     summary: Get download URL for a resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resume ID
 *     responses:
 *       200:
 *         description: Download URL generated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.get("/download/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find resume
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Check if user owns this resume
    if (resume.userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }

    // Check if resume has a public ID
    if (!resume.publicId) {
      return res.status(400).json({
        success: false,
        message: "Resume has not been uploaded yet",
      });
    }

    // Generate download URL
    const downloadUrl = generatePdfUrl(resume.publicId);

    res.status(200).json({
      success: true,
      downloadUrl,
    });
  } catch (error) {
    console.error("Error generating download URL:", error);
    res.status(500).json({
      success: false,
      message: "Error generating download URL",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/resume/user:
 *   get:
 *     summary: Get all resumes for the current user
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumes retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/user", verifyToken, async (req, res) => {
  try {
    // Find all resumes for the user
    const resumes = await Resume.find({ userId: req.user.uid });

    res.status(200).json({
      success: true,
      resumes: resumes.map((resume) => ({
        id: resume._id,
        title: resume.title,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
        fileUrl: resume.fileUrl,
      })),
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching resumes",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/resume/{id}:
 *   get:
 *     summary: Get a specific resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resume ID
 *     responses:
 *       200:
 *         description: Resume retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find resume
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Check if user owns this resume
    if (resume.userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }

    res.status(200).json({
      success: true,
      resume: {
        id: resume._id,
        title: resume.title,
        content: resume.content,
        education: resume.education,
        experience: resume.experience,
        skills: resume.skills,
        objective: resume.objective,
        fileUrl: resume.fileUrl,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching resume",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/resume/{id}:
 *   delete:
 *     summary: Delete a resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resume ID
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find resume
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Check if user owns this resume
    if (resume.userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }

    // Delete file from Cloudinary if it exists
    if (resume.publicId) {
      await deleteFile(resume.publicId);
    }

    // Delete resume from database
    await Resume.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting resume",
      error: error.message,
    });
  }
});

export default router;
