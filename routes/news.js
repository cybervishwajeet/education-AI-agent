import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import NewsArticle from "../models/NewsArticle.js";
import User from "../models/User.js";
import { fetchEducationNews, fetchTrendingTopics } from "../utils/newsapi.js";

const router = express.Router();

/**
 * @swagger
 * /api/news/education:
 *   get:
 *     summary: Get education news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: News category
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of news items to fetch
 *     responses:
 *       200:
 *         description: News retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/education", verifyToken, async (req, res) => {
  try {
    const { category, pageSize } = req.query;

    // Get user's education field for personalized news
    const user = await User.findOne({ uid: req.user.uid });
    const userCategory = user ? user.educationField : "education";

    // Check if we have cached news in the database
    let newsArticles = await NewsArticle.find({
      category: category || userCategory,
    })
      .sort({ publishedAt: -1 })
      .limit(parseInt(pageSize) || 10);

    // If no cached news or cache is old, fetch from API
    if (newsArticles.length === 0) {
      const fetchedNews = await fetchEducationNews(
        category || userCategory,
        parseInt(pageSize) || 10,
      );

      // Save fetched news to database
      const newsPromises = fetchedNews.map((article) => {
        const newsArticle = new NewsArticle({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          source: article.source,
          category: category || userCategory,
        });

        return newsArticle.save();
      });

      newsArticles = await Promise.all(newsPromises);
    }

    // Update user's resources accessed count
    if (user) {
      const newResourcesAccessed = Math.min(
        100,
        user.progress.resourcesAccessed + 1,
      );
      user.progress.resourcesAccessed = newResourcesAccessed;
      await user.save();
    }

    res.status(200).json({
      success: true,
      news: newsArticles.map((article) => ({
        id: article._id,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source,
        category: article.category,
      })),
    });
  } catch (error) {
    console.error("Error fetching education news:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching education news",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/news/trending:
 *   get:
 *     summary: Get trending topics in education
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trending topics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/trending", verifyToken, async (req, res) => {
  try {
    // Fetch trending topics
    const trendingTopics = await fetchTrendingTopics();

    res.status(200).json({
      success: true,
      trending: trendingTopics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        category: topic.category,
        url: topic.url,
      })),
    });
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching trending topics",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get a specific news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News article ID
 *     responses:
 *       200:
 *         description: News article retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: News article not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find news article
    const newsArticle = await NewsArticle.findById(id);

    if (!newsArticle) {
      return res.status(404).json({
        success: false,
        message: "News article not found",
      });
    }

    res.status(200).json({
      success: true,
      article: {
        id: newsArticle._id,
        title: newsArticle.title,
        description: newsArticle.description,
        url: newsArticle.url,
        urlToImage: newsArticle.urlToImage,
        publishedAt: newsArticle.publishedAt,
        source: newsArticle.source,
        category: newsArticle.category,
      },
    });
  } catch (error) {
    console.error("Error fetching news article:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching news article",
      error: error.message,
    });
  }
});

export default router;
