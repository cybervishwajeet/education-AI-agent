import NewsAPI from "newsapi";
import dotenv from "dotenv";

dotenv.config();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

/**
 * Fetch education news from NewsAPI
 * @param {string} category - News category (e.g., 'education', 'technology')
 * @param {number} pageSize - Number of news items to fetch
 * @returns {Promise<Array>} - Array of news articles
 */
export const fetchEducationNews = async (
  category = "education",
  pageSize = 10,
) => {
  try {
    const response = await newsapi.v2.everything({
      q: category,
      language: "en",
      sortBy: "publishedAt",
      pageSize: pageSize,
    });

    return response.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch education news");
  }
};

/**
 * Fetch trending topics in education
 * @returns {Promise<Array>} - Array of trending topics
 */
export const fetchTrendingTopics = async () => {
  try {
    // Fetch news from multiple education-related categories
    const topics = [
      "education technology",
      "online learning",
      "higher education",
      "stem education",
    ];

    const promises = topics.map((topic) =>
      newsapi.v2.everything({
        q: topic,
        language: "en",
        sortBy: "popularity",
        pageSize: 5,
      }),
    );

    const results = await Promise.all(promises);

    // Extract and format trending topics
    const trendingTopics = results.flatMap((result, index) =>
      result.articles.map((article) => ({
        id: `${index}-${article.source.id || article.source.name}`,
        title: article.title,
        description: article.description,
        category: topics[index].split(" ")[0],
        url: article.url,
      })),
    );

    return trendingTopics;
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    throw new Error("Failed to fetch trending topics");
  }
};
