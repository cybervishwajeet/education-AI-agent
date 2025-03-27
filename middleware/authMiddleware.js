import admin from "../config/firebase.js";

/**
 * Middleware to verify Firebase JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

/**
 * Middleware to check if user has admin role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const isAdmin = async (req, res, next) => {
  try {
    // Check if user exists and has admin claim
    if (!req.user || !req.user.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
