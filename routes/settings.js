import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * @swagger
 * /api/settings/preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/preferences', verifyToken, async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user preferences', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/settings/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: [light, dark, system]
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: User preferences updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/preferences', verifyToken, async (req, res) => {
  try {
    const { theme, language } = req.body;
    
    // Find user
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Update preferences
    if (theme) user.preferences.theme = theme;
    if (language) user.preferences.language = language;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating user preferences', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/settings/progress:
 *   get:
 *     summary: Get user learning progress
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User progress retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/progress', verifyToken,