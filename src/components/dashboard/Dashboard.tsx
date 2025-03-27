import React, { useState } from "react";
import DashboardContent from "./DashboardContent";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Zap,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardProps {
  userName?: string;
  educationField?: string;
  isCollapsed?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  userName = "Alex Johnson",
  educationField = "Computer Science",
}) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left side - Logo and mobile menu button */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-slate-400" />
              ) : (
                <Menu className="h-5 w-5 text-slate-400" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>

            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse opacity-70" />
                <div className="absolute inset-0.5 rounded-full bg-slate-900 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                EduAI
              </span>
              <Badge
                variant="outline"
                className="hidden md:flex bg-blue-900/20 text-blue-400 border-blue-800 ml-2"
              >
                <Rocket className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>
          </div>

          {/* Center - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex max-w-md flex-1 mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search courses, resources, topics..."
                className="w-full bg-slate-800/50 border-slate-700 pl-9 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9 text-slate-400"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 pl-2 pr-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                    {userName.charAt(0)}
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium">
                    {userName.split(" ")[0]}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-slate-800 border-slate-700"
              >
                <DropdownMenuLabel className="flex flex-col gap-1 pb-2">
                  <span className="font-medium text-white">{userName}</span>
                  <span className="font-normal text-xs text-slate-400">
                    {educationField} Student
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="flex items-center gap-2 text-slate-300 focus:text-white focus:bg-slate-700">
                  <User className="h-4 w-4 text-blue-400" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-slate-300 focus:text-white focus:bg-slate-700">
                  <Settings className="h-4 w-4 text-purple-400" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-slate-300 focus:text-white focus:bg-slate-700">
                  <Zap className="h-4 w-4 text-amber-400" />
                  Upgrade Plan
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="flex items-center gap-2 text-red-400 focus:text-red-300 focus:bg-red-900/20">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/80 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="fixed top-16 left-0 bottom-0 w-3/4 max-w-xs bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-slate-800/50 border-slate-700 pl-9"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-1">
                {/* Navigation items would go here */}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-blue-400 bg-blue-900/20"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                {/* More navigation items */}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DashboardContent userName={userName} educationField={educationField} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
