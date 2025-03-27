import React, { useState } from "react";
import RecommendedContent from "./RecommendedContent";
import ProgressTracking from "./ProgressTracking";
import TrendingNews from "./TrendingNews";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Zap,
  Brain,
  Award,
  BookOpen,
  MessageSquare,
  UserCircle,
  Calendar,
  BarChart4,
  ArrowRight,
  Clock,
  Star,
  Flame,
  Rocket,
  Lightbulb,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardContentProps {
  userName?: string;
  educationField?: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  userName = "Alex",
  educationField = "Computer Science",
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAITip, setShowAITip] = useState(true);

  // Calculate current time for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good evening";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      {/* Welcome Header with AI Tip */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {greeting},{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {userName}
              </span>
            </h1>
            <p className="text-slate-400 mt-1">
              Your personalized learning dashboard for {educationField}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-blue-900/20 text-blue-400 border-blue-800 py-1.5"
            >
              <Flame className="h-3.5 w-3.5 mr-1.5 text-amber-400" />5 Day
              Streak
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-900/20 text-purple-400 border-purple-800 py-1.5"
            >
              <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
              Level 7
            </Badge>
          </div>
        </div>

        <AnimatePresence>
          {showAITip && (
            <motion.div
              className="mt-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-lg p-4 relative overflow-hidden"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70" />
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-blue-300">
                      AI Learning Assistant
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-slate-400 hover:text-slate-300"
                      onClick={() => setShowAITip(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    Based on your learning patterns, I recommend focusing on{" "}
                    <span className="text-blue-300 font-medium">
                      Data Structures
                    </span>{" "}
                    today. You've been making excellent progress in your{" "}
                    <span className="text-blue-300 font-medium">Python</span>{" "}
                    course!
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-7 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs"
                    >
                      View Recommendation
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 py-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 text-xs"
                    >
                      Ask AI Tutor
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dashboard Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
          >
            <Layers className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
          >
            <BarChart4 className="h-4 w-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left and Center Column (spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Tracking Section */}
          <section aria-labelledby="progress-section">
            <h2 id="progress-section" className="sr-only">
              Your Learning Progress
            </h2>
            <ProgressTracking
              courseProgress={65}
              quizCompletion={42}
              resourcesAccessed={78}
              certificatesEarned={2}
              weeklyGoalProgress={85}
            />
          </section>

          {/* Learning Path Summary */}
          <section className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-400" />
                  Your Learning Path
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                >
                  View Full Path <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-slate-700" />

                <div className="space-y-6">
                  {/* Completed Step */}
                  <div className="relative pl-10">
                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-800 z-10" />
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">
                          Python Fundamentals
                        </h3>
                        <Badge className="bg-green-900/30 text-green-400 border-green-800">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Variables, data types, control flow, functions
                      </p>
                    </div>
                  </div>

                  {/* Current Step */}
                  <div className="relative pl-10">
                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-800 z-10 animate-pulse" />
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-blue-900/50 ring-1 ring-blue-500/20">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">
                          Data Structures
                        </h3>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">
                          In Progress - 65%
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Lists, dictionaries, sets, tuples, advanced operations
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          className="h-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                        >
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Step */}
                  <div className="relative pl-10">
                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-800 z-10" />
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700 opacity-80">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">
                          Object-Oriented Programming
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-slate-400 border-slate-600"
                        >
                          Upcoming
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Classes, inheritance, polymorphism, encapsulation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Content Section */}
          <section aria-labelledby="recommended-section">
            <h2 id="recommended-section" className="sr-only">
              Recommended Learning Resources
            </h2>
            <RecommendedContent
              title={`AI-Recommended for ${educationField}`}
              description="Personalized content based on your learning preferences and progress"
            />
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Schedule Card */}
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                Your learning activities for today
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      Data Structures Tutorial
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      10:00 AM - 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Python Quiz</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      2:00 PM - 2:45 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">AI Tutor Session</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      4:30 PM - 5:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-700 bg-slate-800/30 py-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>

          {/* Trending News Section */}
          <section aria-labelledby="trending-section">
            <h2 id="trending-section" className="sr-only">
              Trending in Technology
            </h2>
            <TrendingNews title={`Trending in ${educationField}`} />
          </section>

          {/* Quick Actions Card */}
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-amber-400" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Shortcuts to boost your learning
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-auto py-3 flex flex-col items-center justify-center bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 border border-blue-900/50">
                  <Award className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">Start Quiz</span>
                </Button>
                <Button className="h-auto py-3 flex flex-col items-center justify-center bg-purple-900/30 hover:bg-purple-800/50 text-purple-300 border border-purple-900/50">
                  <Brain className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">Learning Path</span>
                </Button>
                <Button className="h-auto py-3 flex flex-col items-center justify-center bg-green-900/30 hover:bg-green-800/50 text-green-300 border border-green-900/50">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">AI Tutor</span>
                </Button>
                <Button className="h-auto py-3 flex flex-col items-center justify-center bg-amber-900/30 hover:bg-amber-800/50 text-amber-300 border border-amber-900/50">
                  <UserCircle className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
