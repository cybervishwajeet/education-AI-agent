import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param {string} fileBuffer - Base64 encoded file buffer
 * @param {string} folder - Cloudinary folder to store the file
 * @returns {Promise<Object>} - Cloudinary upload response
 */
export const uploadFile = async (fileBuffer, folder = "resumes") => {
  try {
    const result = await cloudinary.uploader.upload(fileBuffer, {
      folder: folder,
      resource_type: "auto",
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

/**
 * Generate a PDF URL from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {string} - PDF URL
 */
export const generatePdfUrl = (publicId) => {
  return cloudinary.url(publicId, {
    format: "pdf",
    flags: "attachment",
  });
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} - Cloudinary deletion response
 */
export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
};
