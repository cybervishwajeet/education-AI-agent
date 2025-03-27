import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate resume content based on user information
 * @param {Object} userInfo - User information for resume generation
 * @returns {Promise<string>} - Generated resume content
 */
export const generateResume = async (userInfo) => {
  try {
    const { name, education, experience, skills, objective } = userInfo;

    const prompt = `Create a professional resume for ${name} with the following information:\n\n
      Education: ${education}\n\n
      Experience: ${experience}\n\n
      Skills: ${skills}\n\n
      Career Objective: ${objective}\n\n
      Format the resume in a professional way with clear sections for Education, Experience, Skills, and Career Objective.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer with expertise in creating compelling resumes.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error("Failed to generate resume content");
  }
};

/**
 * Generate job recommendations based on user skills and preferences
 * @param {Object} userProfile - User profile information
 * @returns {Promise<Array>} - Array of job recommendations
 */
export const generateJobRecommendations = async (userProfile) => {
  try {
    const { skills, experience, education, preferences } = userProfile;

    const prompt = `Based on the following user profile, recommend 5 suitable job positions with brief descriptions:\n\n
      Skills: ${skills}\n\n
      Experience: ${experience}\n\n
      Education: ${education}\n\n
      Preferences: ${preferences}\n\n
      Format the response as a JSON array with objects containing 'title', 'description', 'requiredSkills', and 'suitabilityScore' (0-100).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a career advisor with expertise in job matching.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    // Parse the JSON response
    const content = response.choices[0].message.content;
    const jobRecommendations = JSON.parse(content);

    return jobRecommendations;
  } catch (error) {
    console.error("Error generating job recommendations:", error);
    throw new Error("Failed to generate job recommendations");
  }
};

/**
 * Generate quiz questions based on a topic
 * @param {string} topic - The topic for quiz questions
 * @param {number} count - Number of questions to generate
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {Promise<Array>} - Array of quiz questions
 */
export const generateQuizQuestions = async (
  topic,
  count = 5,
  difficulty = "medium",
) => {
  try {
    const prompt = `Create ${count} multiple-choice ${difficulty} difficulty questions about ${topic}. 
      Format the response as a JSON array with objects containing 'question', 'options' (array of 4 choices), 'correctAnswer' (the correct option), and 'explanation' (why this is the correct answer).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an educational content creator specializing in creating engaging quiz questions.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    // Parse the JSON response
    const content = response.choices[0].message.content;
    const quizQuestions = JSON.parse(content);

    return quizQuestions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz questions");
  }
};

/**
 * Generate explanation for a quiz answer
 * @param {string} question - The quiz question
 * @param {string} correctAnswer - The correct answer
 * @param {string} userAnswer - The user's answer
 * @returns {Promise<string>} - Explanation for the answer
 */
export const generateAnswerExplanation = async (
  question,
  correctAnswer,
  userAnswer,
) => {
  try {
    const isCorrect = correctAnswer === userAnswer;

    const prompt = `For the question: "${question}"
      The correct answer is: "${correctAnswer}"
      The user answered: "${userAnswer}"
      
      ${isCorrect ? "Explain why this answer is correct in detail." : "Explain why the user's answer is incorrect and why the correct answer is right. Provide a detailed explanation."}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an educational tutor providing helpful explanations for quiz answers.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating answer explanation:", error);
    throw new Error("Failed to generate answer explanation");
  }
};
