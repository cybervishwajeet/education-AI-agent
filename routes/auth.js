import express from "express";
import admin from "../config/firebase.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - displayName
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               displayName:
 *                 type: string
 *               educationField:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *                 enum: [school, undergraduate, graduate, postgraduate]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, displayName, educationField, educationLevel } =
      req.body;

    // Validate request data
    if (!email || !password || !displayName) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and display name are required",
      });
    }

    // Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Create user in MongoDB
    const user = new User({
      uid: userRecord.uid,
      email,
      displayName,
      educationField: educationField || "Computer Science",
      educationLevel: educationLevel || "undergraduate",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        educationField: user.educationField,
        educationLevel: user.educationLevel,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", async (req, res) => {
  // Note: This endpoint is for documentation purposes only.
  // Actual authentication is handled by Firebase client SDK
  res.status(200).json({
    success: true,
    message:
      "This endpoint is for documentation. Authentication is handled by Firebase client SDK.",
  });
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        educationField: user.educationField,
        educationLevel: user.educationLevel,
        skills: user.skills,
        preferences: user.preferences,
        progress: user.progress,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/auth/update-profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               photoURL:
 *                 type: string
 *               educationField:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { displayName, photoURL, educationField, educationLevel, skills } =
      req.body;

    // Find user in MongoDB
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user in Firebase if displayName is provided
    if (displayName) {
      await admin.auth().updateUser(req.user.uid, { displayName });
    }

    // Update user in MongoDB
    if (displayName) user.displayName = displayName;
    if (photoURL) user.photoURL = photoURL;
    if (educationField) user.educationField = educationField;
    if (educationLevel) user.educationLevel = educationLevel;
    if (skills) user.skills = skills;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        educationField: user.educationField,
        educationLevel: user.educationLevel,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
});

export default router;
