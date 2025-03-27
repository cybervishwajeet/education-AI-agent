import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     NewsArticle:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - url
 *       properties:
 *         title:
 *           type: string
 *           description: Article title
 *         description:
 *           type: string
 *           description: Article description
 *         url:
 *           type: string
 *           description: URL to the full article
 *         urlToImage:
 *           type: string
 *           description: URL to the article image
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: Publication date
 *         source:
 *           type: string
 *           description: News source
 *         category:
 *           type: string
 *           description: Article category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Article creation timestamp in database
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Article last update timestamp
 */
const NewsArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    urlToImage: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
    source: {
      type: String,
    },
    category: {
      type: String,
      default: "education",
    },
  },
  {
    timestamps: true,
  },
);

// Create index for faster queries and to expire old news articles
NewsArticleSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 },
); // 7 days

const NewsArticle = mongoose.model("NewsArticle", NewsArticleSchema);

export default NewsArticle;
