import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  Brain,
  Award,
  FileText,
  Briefcase,
  Globe,
  Rocket,
  Zap,
  Users,
  BarChart,
  Lightbulb,
  Layers,
} from "lucide-react";

import AuthForm from "./auth/AuthForm";
import Dashboard from "./dashboard/Dashboard";
import AIChatbot from "./chatbot/AIChatbot";
import LearningPath from "./learning/LearningPath";
import QuizModule from "./quiz/QuizModule";
import ProfileSettings from "./profile/ProfileSettings";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "learning" | "quiz" | "profile" | "resume"
  >("dashboard");
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    educationField: "Computer Science",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleAuthSubmit = (values: any) => {
    console.log("Auth values:", values);
    // In a real app, this would make an API call to authenticate the user
    setIsAuthenticated(true);
    if (values.name) {
      setUserData({
        ...userData,
        name: values.name,
        educationField: values.educationLevel,
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("dashboard");
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "learning",
      label: "Learning Path",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      id: "quiz",
      label: "Quiz & Assessments",
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: "profile",
      label: "Profile Settings",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "resume",
      label: "Resume Builder",
      icon: <Briefcase className="h-5 w-5" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <Sparkles className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold">AI-Powered Learning Platform</h1>
          <p className="text-muted-foreground mt-2">
            Loading your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">EduAI</span>
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <header className="text-center mb-12 mt-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                AI-Powered Learning Platform
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Personalized education tailored to your needs with AI-generated
                learning paths and intelligent assistance.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm bg-primary/5"
                >
                  <Rocket className="h-3.5 w-3.5 mr-1" />
                  Interactive Roadmaps
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm bg-primary/5"
                >
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  AI-Powered
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm bg-primary/5"
                >
                  <Globe className="h-3.5 w-3.5 mr-1" />
                  Curated Resources
                </Badge>
              </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-primary/10 dark:bg-primary/5 p-6 rounded-lg border border-primary/20 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Personalized Learning Experience
                </h2>
                <ul className="space-y-3">
                  {[
                    "Interactive roadmaps from roadmap.sh integration",
                    "AI-generated learning paths based on your field",
                    "Intelligent chatbot for subject-related questions",
                    "Personalized quizzes to test your knowledge",
                    "Curated resources from across the web",
                    "Progress tracking and performance analytics",
                    "Resume and portfolio builder for career advancement",
                    "Job and internship recommendations",
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <ArrowRight className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card dark:bg-slate-800/50 p-4 rounded-lg border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium mb-1">Community Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with peers and learn together through collaborative
                    projects.
                  </p>
                </div>

                <div className="bg-card dark:bg-slate-800/50 p-4 rounded-lg border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                    <BarChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium mb-1">Progress Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your learning journey with detailed analytics and
                    insights.
                  </p>
                </div>

                <div className="bg-card dark:bg-slate-800/50 p-4 rounded-lg border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                    <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-1">AI Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized content recommendations based on your
                    interests.
                  </p>
                </div>

                <div className="bg-card dark:bg-slate-800/50 p-4 rounded-lg border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                    <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-medium mb-1">Career Pathways</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore different career paths and required skills for each
                    role.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-border/50"
            >
              <AuthForm onSubmit={handleAuthSubmit} />
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              © 2023 EduAI Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background dark:bg-slate-900 text-foreground dark:text-slate-100 transition-colors duration-200`}
    >
      {/* Top Navigation Bar for Mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background dark:bg-slate-900 sticky top-0 z-40">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <div className="flex items-center ml-2">
            <Sparkles className="h-5 w-5 text-primary mr-1.5" />
            <h1 className="text-xl font-bold">EduAI</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-background dark:bg-slate-900 border-r shadow-lg pt-16"
          >
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
              <div className="pt-4 border-t mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500"
                  onClick={handleLogout}
                >
                  <X className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex h-screen lg:pt-0 pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <div className="w-64 h-screen border-r bg-background dark:bg-slate-900 fixed left-0 top-0 z-30">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-1.5" />
                <h1 className="text-xl font-bold">EduAI</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentView(item.id as any)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
              <div className="pt-4 border-t mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500"
                  onClick={handleLogout}
                >
                  <X className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {/* Dashboard View */}
              {currentView === "dashboard" && (
                <Dashboard
                  userName={userData.name}
                  educationField={userData.educationField}
                  isCollapsed={false}
                />
              )}

              {/* Learning Path View */}
              {currentView === "learning" && (
                <div className="flex-1 overflow-auto">
                  <LearningPath field={userData.educationField} />
                </div>
              )}

              {/* Quiz Module View */}
              {currentView === "quiz" && (
                <div className="flex-1 overflow-auto">
                  <QuizModule />
                </div>
              )}

              {/* Profile Settings View */}
              {currentView === "profile" && (
                <div className="flex-1 overflow-auto">
                  <ProfileSettings />
                </div>
              )}

              {/* Resume Builder View - Placeholder */}
              {currentView === "resume" && (
                <div className="flex-1 overflow-auto p-6">
                  <div className="max-w-4xl mx-auto bg-card dark:bg-slate-800 rounded-xl shadow-lg p-8 border">
                    <h1 className="text-3xl font-bold mb-6">
                      AI Resume Builder
                    </h1>
                    <p className="text-muted-foreground mb-8">
                      Create a professional resume with AI assistance
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4 border rounded-lg p-6">
                        <h2 className="text-xl font-semibold">
                          Resume Templates
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Choose from professionally designed templates
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="border rounded-md aspect-[3/4] bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                            >
                              Template {i}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 border rounded-lg p-6">
                        <h2 className="text-xl font-semibold">AI Features</h2>
                        <p className="text-sm text-muted-foreground">
                          Let AI help you create the perfect resume
                        </p>
                        <ul className="space-y-2 mt-4">
                          <li className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span>Generate professional summaries</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span>Enhance skill descriptions</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span>Suggest relevant keywords</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span>Tailor resume to job descriptions</span>
                          </li>
                        </ul>
                        <Button className="w-full mt-4">Start Building</Button>
                      </div>
                    </div>

                    <div className="mt-8 border rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Recent Job Recommendations
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="border rounded-md p-4 hover:border-primary transition-colors"
                          >
                            <h3 className="font-medium">Software Developer</h3>
                            <p className="text-sm text-muted-foreground">
                              TechCorp Inc.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">Remote</Badge>
                              <Badge variant="outline">Full-time</Badge>
                            </div>
                            <Button variant="link" className="mt-2 h-auto p-0">
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Chatbot Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={toggleChatbot}
              className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Sparkles className="h-6 w-6" />
              <span className="sr-only">Open AI Assistant</span>
            </Button>
          </motion.div>
        </div>

        {/* Chatbot Component */}
        <AnimatePresence>
          {showChatbot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-6 z-50"
            >
              <AIChatbot
                userName={userData.name}
                userField={userData.educationField}
                onClose={toggleChatbot}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
