import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  Award,
  Brain,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModuleProps {
  title?: string;
  description?: string;
  questions?: Question[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

const QuizModule = ({
  title = "AI-Generated Quiz",
  description = "Test your knowledge with these AI-generated questions based on your learning path.",
  questions = [
    {
      id: 1,
      question:
        "What is the primary purpose of a learning path in an educational platform?",
      options: [
        "To restrict what users can learn",
        "To provide a structured approach to learning a subject",
        "To replace traditional education entirely",
        "To make learning more difficult",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Which of the following is a benefit of AI-powered personalized learning?",
      options: [
        "It eliminates the need for human teachers",
        "It makes all students learn at the same pace",
        "It adapts to individual learning styles and needs",
        "It only works for technical subjects",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What is a key feature of an effective quiz assessment?",
      options: [
        "It only includes very difficult questions",
        "It provides immediate feedback on answers",
        "It never allows retaking the quiz",
        "It only focuses on memorization",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "How can AI improve educational content curation?",
      options: [
        "By limiting content to only one source",
        "By randomly selecting content without consideration",
        "By personalizing content based on user preferences and performance",
        "By making all content more difficult to understand",
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      question:
        "What is an advantage of having progress tracking in a learning platform?",
      options: [
        "It makes learning more stressful",
        "It helps users identify strengths and areas for improvement",
        "It forces users to compete with others",
        "It slows down the learning process",
      ],
      correctAnswer: 1,
    },
  ],
  onComplete = () => {},
}: QuizModuleProps) => {
  const [currentTab, setCurrentTab] = useState("topics");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  // Mock topics for selection
  const topics = [
    {
      id: "web-dev",
      name: "Web Development",
      questionCount: 5,
      difficulty: "Intermediate",
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      questionCount: 5,
      difficulty: "Advanced",
    },
    {
      id: "data-science",
      name: "Data Science",
      questionCount: 5,
      difficulty: "Intermediate",
    },
    {
      id: "mobile-dev",
      name: "Mobile Development",
      questionCount: 5,
      difficulty: "Beginner",
    },
  ];

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    // In a real app, this would fetch questions for the selected topic
  };

  const handleStartQuiz = () => {
    setCurrentTab("quiz");
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(questions.length).fill(-1));
    setQuizSubmitted(false);
    setTimeRemaining(300);
    // In a real app, this would start a timer
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    setCurrentTab("results");

    // Calculate score
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    onComplete(score, questions.length);
  };

  const handleRetakeQuiz = () => {
    setCurrentTab("topics");
    setSelectedTopic(null);
    setQuizSubmitted(false);
    setSelectedAnswers(Array(questions.length).fill(-1));
  };

  // Calculate progress percentage
  const progressPercentage =
    (currentQuestionIndex / (questions.length - 1)) * 100;

  // Calculate score for results
  const score = selectedAnswers.reduce((total, answer, index) => {
    return total + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const scorePercentage = (score / questions.length) * 100;

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="topics">Select Topic</TabsTrigger>
              <TabsTrigger
                value="quiz"
                disabled={!selectedTopic && currentTab !== "quiz"}
              >
                Take Quiz
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!quizSubmitted}>
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {topics.map((topic) => (
                  <Card
                    key={topic.id}
                    className={`cursor-pointer transition-all ${selectedTopic === topic.id ? "ring-2 ring-primary" : "hover:bg-accent"}`}
                    onClick={() => handleSelectTopic(topic.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                      <CardDescription>
                        {topic.questionCount} questions • {topic.difficulty}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTopic(topic.id);
                        }}
                      >
                        Select <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleStartQuiz}
                  disabled={!selectedTopic}
                  className="w-full md:w-auto"
                >
                  Start Quiz
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              <Progress value={progressPercentage} className="mb-6" />

              {questions[currentQuestionIndex] && (
                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    {questions[currentQuestionIndex].question}
                  </div>

                  <RadioGroup
                    value={
                      selectedAnswers[currentQuestionIndex]?.toString() || ""
                    }
                    onValueChange={(value) =>
                      handleSelectAnswer(parseInt(value))
                    }
                    className="space-y-3"
                  >
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent"
                        >
                          <RadioGroupItem
                            value={index.toString()}
                            id={`option-${index}`}
                          />
                          <label
                            htmlFor={`option-${index}`}
                            className="flex-grow cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ),
                    )}
                  </RadioGroup>

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>

                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswers[currentQuestionIndex] === -1}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmitQuiz}
                        disabled={selectedAnswers.includes(-1)}
                      >
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  {scorePercentage >= 70 ? (
                    <Award className="h-12 w-12 text-primary" />
                  ) : scorePercentage >= 40 ? (
                    <Brain className="h-12 w-12 text-primary" />
                  ) : (
                    <Clock className="h-12 w-12 text-primary" />
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  {scorePercentage >= 70
                    ? "Great job!"
                    : scorePercentage >= 40
                      ? "Good effort!"
                      : "Keep practicing!"}
                </h3>

                <p className="text-muted-foreground mb-4">
                  You scored {score} out of {questions.length} (
                  {Math.round(scorePercentage)}%)
                </p>

                <Progress value={scorePercentage} className="h-3 mb-8" />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Question Review</h4>

                {questions.map((question, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${selectedAnswers[index] === question.correctAnswer ? "border-l-green-500" : "border-l-red-500"}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          {question.question}
                        </CardTitle>
                        {selectedAnswers[index] === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="text-sm text-red-500 font-medium flex-shrink-0">
                            Incorrect
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm">
                        <p className="font-medium">
                          Your answer:{" "}
                          <span
                            className={
                              selectedAnswers[index] === question.correctAnswer
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {question.options[selectedAnswers[index]]}
                          </span>
                        </p>

                        {selectedAnswers[index] !== question.correctAnswer && (
                          <p className="font-medium mt-1">
                            Correct answer:{" "}
                            <span className="text-green-500">
                              {question.options[question.correctAnswer]}
                            </span>
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleRetakeQuiz}
                  className="flex items-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizModule;
