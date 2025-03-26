import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
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
  Home as HomeIcon,
  Settings,
  HelpCircle,
} from "lucide-react";

import Dashboard from "./dashboard/Dashboard";
import AIChatbot from "./chatbot/AIChatbot";
import LearningPath from "./learning/LearningPath";
import QuizModule from "./quiz/QuizModule";
import ProfileSettings from "./profile/ProfileSettings";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Home: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "learning" | "quiz" | "profile" | "resume"
  >("dashboard");
  const [userData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    educationField: "Computer Science",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Apply dark mode by default
    document.documentElement.classList.add("dark");

    return () => clearTimeout(timer);
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
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
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: "resume",
      label: "Resume Builder",
      icon: <Briefcase className="h-5 w-5" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-slate-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <Sparkles className="h-12 w-12 text-blue-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">
            AI-Powered Learning Platform
          </h1>
          <p className="text-slate-400 mt-2">
            Loading your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Navigation Bar for Mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-40">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-100" />
            ) : (
              <Menu className="h-6 w-6 text-slate-100" />
            )}
          </Button>
          <div className="flex items-center ml-2">
            <Sparkles className="h-5 w-5 text-blue-400 mr-1.5" />
            <h1 className="text-xl font-bold text-white">EduAI</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChatbot}
            className="rounded-full bg-blue-600/10 text-blue-400"
          >
            <HelpCircle className="h-5 w-5" />
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
            className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 shadow-lg pt-16"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex h-screen lg:pt-0 pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <div className="w-64 h-screen border-r border-slate-800 bg-slate-900 fixed left-0 top-0 z-30">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-400 mr-1.5" />
                <h1 className="text-xl font-bold text-white">EduAI</h1>
              </div>
              <Badge
                variant="outline"
                className="bg-blue-600/10 text-blue-400 border-blue-800"
              >
                <Rocket className="h-3.5 w-3.5 mr-1" />
                Beta
              </Badge>
            </div>
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${currentView === item.id ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-800"}`}
                  onClick={() => setCurrentView(item.id as any)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{userData.name}</p>
                  <p className="text-xs text-slate-400">
                    {userData.educationField}
                  </p>
                </div>
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
                  <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
                    <h1 className="text-3xl font-bold mb-6 text-white">
                      AI Resume Builder
                    </h1>
                    <p className="text-slate-400 mb-8">
                      Create a professional resume with AI assistance
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4 border border-slate-700 rounded-lg p-6 bg-slate-800/50">
                        <h2 className="text-xl font-semibold text-white">
                          Resume Templates
                        </h2>
                        <p className="text-sm text-slate-400">
                          Choose from professionally designed templates
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="border border-slate-700 rounded-md aspect-[3/4] bg-slate-700/50 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors text-slate-300"
                            >
                              Template {i}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 border border-slate-700 rounded-lg p-6 bg-slate-800/50">
                        <h2 className="text-xl font-semibold text-white">
                          AI Features
                        </h2>
                        <p className="text-sm text-slate-400">
                          Let AI help you create the perfect resume
                        </p>
                        <ul className="space-y-2 mt-4">
                          <li className="flex items-center gap-2 text-slate-300">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span>Generate professional summaries</span>
                          </li>
                          <li className="flex items-center gap-2 text-slate-300">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span>Enhance skill descriptions</span>
                          </li>
                          <li className="flex items-center gap-2 text-slate-300">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span>Suggest relevant keywords</span>
                          </li>
                          <li className="flex items-center gap-2 text-slate-300">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span>Tailor resume to job descriptions</span>
                          </li>
                        </ul>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                          Start Building
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8 border border-slate-700 rounded-lg p-6 bg-slate-800/50">
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        Recent Job Recommendations
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="border border-slate-700 rounded-md p-4 hover:border-blue-500 transition-colors bg-slate-800"
                          >
                            <h3 className="font-medium text-white">
                              Software Developer
                            </h3>
                            <p className="text-sm text-slate-400">
                              TechCorp Inc.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className="text-slate-300 border-slate-600"
                              >
                                Remote
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-slate-300 border-slate-600"
                              >
                                Full-time
                              </Badge>
                            </div>
                            <Button
                              variant="link"
                              className="mt-2 h-auto p-0 text-blue-400 hover:text-blue-300"
                            >
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
