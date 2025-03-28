import React, { useState, useEffect } from "react";
import TrendingNews from "./TrendingNews";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/auth/AuthProvider";
import axios from "axios";
import {
  Sparkles,
  Zap,
  Brain,
  Award,
  BookOpen,
  MessageSquare,
  Newspaper,
  Calendar,
  BarChart4,
  ArrowRight,
  Clock,
  Star,
  Flame,
  Rocket,
  Search,
  Code,
  Server,
  Database,
  Globe,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface DashboardContentProps {
  userName?: string;
  educationField?: string;
}

// Roadmap categories
const roadmapCategories = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: <Server className="h-5 w-5" />,
  },
  { id: "devops", name: "DevOps", icon: <Cpu className="h-5 w-5" /> },
  { id: "database", name: "Database", icon: <Database className="h-5 w-5" /> },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: <Layers className="h-5 w-5" />,
  },
  { id: "web3", name: "Web3", icon: <Globe className="h-5 w-5" /> },
];

// Mock roadmap data
const mockRoadmapData = {
  frontend: [
    {
      id: "html",
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML structure and semantics",
      url: "https://roadmap.sh/frontend",
    },
    {
      id: "css",
      title: "CSS Styling",
      description: "Master CSS for styling web pages",
      url: "https://roadmap.sh/frontend",
    },
    {
      id: "javascript",
      title: "JavaScript Essentials",
      description: "Learn core JavaScript concepts and DOM manipulation",
      url: "https://roadmap.sh/frontend",
    },
    {
      id: "frameworks",
      title: "Frontend Frameworks",
      description: "Explore React, Vue, Angular and other frameworks",
      url: "https://roadmap.sh/frontend",
    },
  ],
  backend: [
    {
      id: "languages",
      title: "Backend Languages",
      description: "Choose and learn a backend programming language",
      url: "https://roadmap.sh/backend",
    },
    {
      id: "apis",
      title: "API Development",
      description: "Learn to build RESTful and GraphQL APIs",
      url: "https://roadmap.sh/backend",
    },
  ],
  devops: [
    {
      id: "cicd",
      title: "CI/CD Pipelines",
      description: "Set up continuous integration and deployment",
      url: "https://roadmap.sh/devops",
    },
    {
      id: "containers",
      title: "Containerization",
      description: "Learn Docker and container orchestration",
      url: "https://roadmap.sh/devops",
    },
  ],
};

const DashboardContent: React.FC<DashboardContentProps> = ({
  userName,
  educationField,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAITip, setShowAITip] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("roadmap");

  // Calculate current time for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good evening";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";

  // Fetch roadmap data when category changes
  useEffect(() => {
    const fetchRoadmapData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call to roadmap.sh
        // const response = await axios.get(`https://api.roadmap.sh/roadmaps/${selectedCategory}`);
        // const data = await response.data;

        // For now, we'll use our mock data
        setTimeout(() => {
          setRoadmapItems(mockRoadmapData[selectedCategory] || []);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
        setIsLoading(false);
      }
    };

    fetchRoadmapData();
  }, [selectedCategory]);

  // Filter roadmap items based on search query
  const filteredRoadmapItems = roadmapItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      {/* Welcome Header with AI Tip */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {greeting},{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {user?.displayName || userName || "Learner"}
              </span>
            </h1>
            <p className="text-slate-400 mt-1">
              Your personalized learning dashboard for{" "}
              {user?.educationField || educationField || "Computer Science"}
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
                    Based on your interests, I recommend exploring the{" "}
                    <span className="text-blue-300 font-medium">
                      {selectedCategory === "frontend"
                        ? "Frontend"
                        : selectedCategory === "backend"
                          ? "Backend"
                          : "DevOps"}
                    </span>{" "}
                    roadmap. Check out the interactive learning paths from
                    roadmap.sh below!
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-7 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs"
                      onClick={() => {
                        setActiveTab("roadmaps");
                        setViewMode("roadmap");
                      }}
                    >
                      Explore Roadmaps
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
            value="roadmaps"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
          >
            <Globe className="h-4 w-4 mr-2" />
            Roadmaps
          </TabsTrigger>
          <TabsTrigger
            value="news"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
          >
            <Newspaper className="h-4 w-4 mr-2" />
            Tech News
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left and Center Column (spans 2 columns on large screens) */}
            <div className="lg:col-span-2 space-y-6">
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
                      onClick={() => {
                        setActiveTab("roadmaps");
                        setViewMode("roadmap");
                      }}
                    >
                      View Roadmaps <ArrowRight className="ml-1 h-4 w-4" />
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
                              HTML & CSS Fundamentals
                            </h3>
                            <Badge className="bg-green-900/30 text-green-400 border-green-800">
                              Completed
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            Structure, semantics, styling, responsive design
                          </p>
                        </div>
                      </div>

                      {/* Current Step */}
                      <div className="relative pl-10">
                        <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-800 z-10 animate-pulse" />
                        <div className="bg-slate-800/80 rounded-lg p-4 border border-blue-900/50 ring-1 ring-blue-500/20">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white">
                              JavaScript Essentials
                            </h3>
                            <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">
                              In Progress - 65%
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            Core concepts, DOM manipulation, ES6+ features
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <Button
                              size="sm"
                              className="h-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                              onClick={() =>
                                window.open(
                                  "https://roadmap.sh/javascript",
                                  "_blank",
                                )
                              }
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
                              Frontend Frameworks
                            </h3>
                            <Badge
                              variant="outline"
                              className="text-slate-400 border-slate-600"
                            >
                              Upcoming
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            React, Vue, Angular and state management
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Roadmap Preview */}
              <section className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-blue-400" />
                      Interactive Roadmaps
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                      onClick={() => {
                        setActiveTab("roadmaps");
                        setViewMode("roadmap");
                      }}
                    >
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {roadmapCategories.slice(0, 3).map((category) => (
                      <Card
                        key={category.id}
                        className={`cursor-pointer transition-all hover:scale-105 ${selectedCategory === category.id ? "border-primary ring-1 ring-primary" : ""}`}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setActiveTab("roadmaps");
                        }}
                      >
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-slate-700"}`}
                          >
                            {category.icon}
                          </div>
                          <p className="font-medium text-sm">{category.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white flex items-center">
                        <Code className="h-4 w-4 mr-2 text-blue-400" />
                        Frontend Development Roadmap
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-blue-400 hover:text-blue-300"
                        onClick={() =>
                          window.open("https://roadmap.sh/frontend", "_blank")
                        }
                      >
                        <ExternalLink className="h-3 w-3 mr-1" /> View Full
                        Roadmap
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {mockRoadmapData.frontend.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-800 rounded p-3 border border-slate-700"
                        >
                          <h4 className="font-medium text-sm text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                      ))}
                      <div className="text-center pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-slate-400 hover:text-slate-300"
                          onClick={() => {
                            setActiveTab("roadmaps");
                            setSelectedCategory("frontend");
                          }}
                        >
                          View more topics...
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
                          JavaScript Tutorial
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
                        <p className="font-medium text-white">Frontend Quiz</p>
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
                        <p className="font-medium text-white">
                          AI Tutor Session
                        </p>
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
                <TrendingNews
                  title={`Trending in ${user?.educationField || educationField || "Technology"}`}
                />
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
                    <Button
                      className="h-auto py-3 flex flex-col items-center justify-center bg-purple-900/30 hover:bg-purple-800/50 text-purple-300 border border-purple-900/50"
                      onClick={() => {
                        setActiveTab("roadmaps");
                        setViewMode("roadmap");
                      }}
                    >
                      <Brain className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Roadmaps</span>
                    </Button>
                    <Button className="h-auto py-3 flex flex-col items-center justify-center bg-green-900/30 hover:bg-green-800/50 text-green-300 border border-green-900/50">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">AI Tutor</span>
                    </Button>
                    <Button
                      className="h-auto py-3 flex flex-col items-center justify-center bg-amber-900/30 hover:bg-amber-800/50 text-amber-300 border border-amber-900/50"
                      onClick={() => setActiveTab("news")}
                    >
                      <Newspaper className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">News</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Roadmaps Tab Content */}
        <TabsContent value="roadmaps" className="space-y-6">
          <div className="space-y-6">
            {/* Roadmap Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {roadmapCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${selectedCategory === category.id ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-slate-700"}`}
                    >
                      {category.icon}
                    </div>
                    <p className="font-medium text-sm">{category.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search roadmap items..."
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-slate-800 border-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Roadmap Items */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : filteredRoadmapItems.length > 0 ? (
                filteredRoadmapItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-md transition-all bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                          onClick={() => window.open(item.url, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Roadmap
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">
                    No roadmap items found. Try a different search or category.
                  </p>
                </div>
              )}
            </div>

            {/* Roadmap.sh Integration Note */}
            <div className="mt-8 p-4 border border-dashed border-yellow-500 bg-yellow-900/20 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center text-yellow-300">
                <Database className="h-4 w-4 mr-2 text-yellow-400" />
                Roadmap.sh Integration
              </h3>
              <p className="text-sm text-slate-300">
                This feature integrates with roadmap.sh to provide interactive
                career roadmaps. In a production environment, this would connect
                to the roadmap.sh API to fetch real-time data and track your
                progress across different learning paths.
              </p>
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-yellow-600 text-yellow-400 hover:bg-yellow-900/30"
                  onClick={() => window.open("https://roadmap.sh", "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> Visit roadmap.sh
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* News Tab Content */}
        <TabsContent value="news" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 col-span-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Newspaper className="h-5 w-5 mr-2 text-blue-400" />
                  Technology News & Updates
                </CardTitle>
                <CardDescription>
                  Stay updated with the latest trends and developments in
                  technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrendingNews title="" showHeader={false} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;
