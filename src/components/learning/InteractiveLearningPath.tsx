import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Code,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  ExternalLink,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface InteractiveLearningPathProps {
  field?: string;
}

const learningPathData = {
  "Computer Science": {
    title: "Computer Science Learning Path",
    description: "A comprehensive learning path for Computer Science fundamentals and advanced topics",
    progress: 35,
    modules: [
      {
        id: "m1",
        title: "Programming Fundamentals",
        description: "Learn the basics of programming and computer science",
        progress: 80,
        completed: true,
        units: [
          {
            id: "u1",
            title: "Introduction to Programming",
            type: "lesson",
            duration: "45 min",
            completed: true,
            resources: [
              {
                id: "r1",
                title: "Programming Basics",
                type: "article",
                url: "https://example.com/programming-basics",
              },
              {
                id: "r2",
                title: "Getting Started with Coding",
                type: "video",
                url: "https://example.com/coding-intro",
                duration: "15 min",
              },
            ],
          },
          {
            id: "u2",
            title: "Variables and Data Types",
            type: "lesson",
            duration: "60 min",
            completed: true,
            resources: [
              {
                id: "r3",
                title: "Understanding Variables",
                type: "article",
                url: "https://example.com/variables",
              },
              {
                id: "r4",
                title: "Data Types Explained",
                type: "video",
                url: "https://example.com/data-types",
                duration: "20 min",
              },
            ],
          },
          {
            id: "u3",
            title: "Control Flow",
            type: "lesson",
            duration: "75 min",
            completed: true,
            resources: [
              {
                id: "r5",
                title: "Conditional Statements",
                type: "article",
                url: "https://example.com/conditionals",
              },
              {
                id: "r6",
                title: "Loops and Iterations",
                type: "video",
                url: "https://example.com/loops",
                duration: "25 min",
              },
            ],
          },
          {
            id: "u4",
            title: "Functions and Methods",
            type: "lesson",
            duration: "90 min",
            completed: false,
            resources: [
              {
                id: "r7",
                title: "Creating Functions",
                type: "article",
                url: "https://example.com/functions",
              },
              {
                id: "r8",
                title: "Function Parameters and Return Values",
                type: "video",
                url: "https://example.com/function-params",
                duration: "30 min",
              },
            ],
          },
          {
            id: "u5",
            title: "Programming Fundamentals Quiz",
            type: "quiz",
            duration: "30 min",
            completed: false,
            questions: 10,
          },
        ],
      },
      {
        id: "m2",
        title: "Data Structures",
        description: "Learn about arrays, linked lists, stacks, queues, and more",
        progress: 40,
        completed: false,
        units: [
          {
            id: "u6",
            title: "Arrays and Lists",
            type: "lesson",
            duration: "60 min",
            completed: true,
            resources: [
              {
                id: "r9",
                title: "Introduction to Arrays",
                type: "article",
                url: "https://example.com/arrays",
              },
              {
                id: "r10",
                title: "Working with Lists",
                type: "video",
                url: "https://example.com/lists",
                duration: "20 min",
              },
            ],
          },
          {
            id: "u7",
            title: "Linked Lists",
            type: "lesson",
            duration: "75 min",
            completed: true,
            resources: [
              {
                id: "r11",
                title: "Understanding Linked Lists",
                type: "article",
                url: "https://example.com/linked-lists",
              },
              {
                id: "r12",
                title: "Implementing Linked Lists",
                type: "video",
                url: "https://example.com/linked-lists-impl",
                duration: "25 min",
              },
            ],
          },
          {
            id: "u8",
            title: "Stacks and Queues",
            type: "lesson",
            duration: "60 min",
            completed: false,
            resources: [
              {
                id: "r13",
                title: "Stack Data Structure",
                type: "article",
                url: "https://example.com/stacks",
              },
              {
                id: "r14",
                title: "Queue Data Structure",
                type: "video",
                url: "https://example.com/queues",
                duration: "20 min",
              },
            ],
          },
          {
            id: "u9",
            title: "Trees and Graphs",
            type: "lesson",
            duration: "90 min",
            completed: false,
            resources: [
              {
                id: "r15",
                title: "Tree Data Structures",
                type: "article",
                url: "https://example.com/trees",
              },
              {
                id: "r16",
                title: "Graph Theory Basics",
                type: "video",
                url: "https://example.com/graphs",
                duration: "30 min",
              },
            ],
          },
          {
            id: "u10",
            title: "Data Structures Quiz",
            type: "quiz",
            duration: "45 min",
            completed: false,
            questions: 15,
          },
        ],
      },
      {
        id: "m3",
        title: "Algorithms",
        description: "Learn about sorting, searching, and other fundamental algorithms",
        progress: 10,
        completed: false,
        units: [
          {
            id: "u11",
            title: "Introduction to Algorithms",
            type: "lesson",
            duration: "45 min",
            completed: true,
            resources: [
              {
                id: "r17",
                title: "What are Algorithms?",
                type: "article",
                url: "https://example.com/algorithms-intro",
              },
              {
                id: "r18",
                title: "Algorithm Complexity",
                type: "video",
                url: "https://example.com/algorithm-complexity",
                duration: "15 min",
              },
            ],
          },
          {
            id: "u12",
            title: "Sorting Algorithms",
            type: "lesson",
            duration: "90 min",
            completed: false,
            resources: [
              {
                id: "r19",
                title: "Bubble Sort and Selection Sort",
                type: "article",
                url: "https://example.com/basic-sorting",
              },
              {
                id: "r20",
                title: "Merge Sort and Quick Sort",
                type: "video",
                url: "https://example.com/advanced-sorting",
                duration: "30 min",
              },
            ],
          },
          {
            id: "u13",
            title: "Searching Algorithms",
            type: "lesson",
            duration: "60 min",
            completed: false,
            resources: [
              {
                id: "r21",
                title: "Linear Search",
                type: "article",
                url: "https://example.com/linear-search",
              },
              {
                id: "r22",
                title: "Binary Search",
                type: "video",
                url: "https://example.com/binary-search",
                duration: "20 min",
              },
            ],
          },
          {
            id: "u14",
            title: "Algorithms Quiz",
            type: "quiz",
            duration: "45 min",
            completed: false,
            questions: 15,
          },
        ],
      },
      {
        id: "m4",
        title: "Web Development",
        description: "Learn HTML, CSS, JavaScript, and modern web frameworks",
        progress: 0,
        completed: false,
        locked: true,
        units: [
          {
            id: "u15",
            title: "HTML Fundamentals",
            type: "lesson",
            duration: "60 min",
            completed: false,
            resources: [
              {
                id: "r23",
                title: "HTML Basics",
                type: "article",
                url: "https://example.com/html-basics",
              },
              {
                id: "r24",
                title: "HTML Structure and Elements",
                type: "video",
                url: "https://example.com/html-elements",
                duration: "20 min",
              },
            ],
          },
          {
            id: "u16",
            title: "CSS Styling",
            type: "lesson",
            duration: "75 min",
            completed: false,
            resources: [
              {
                id: "r25",
                title: "CSS Selectors and Properties",
                type: "article",
                url: "https://example.com/css-basics",
              },
              {
                id: "r26",
                title: "CSS Layout and Positioning",
                type: "video",
                url: "https://example.com/css-layout",
                duration: "25 min",
              },
            ],
          },
          {
            id: "u17",
            title: "JavaScript Basics",
            type: "lesson",
            duration: "90 min",
            completed: false,
            resources: [
              {
                id: "r27",
                title: "JavaScript Fundamentals",
                type: "article",
                url: "https://example.com/js-basics",
              },
              {
                id: "r28",
                title: "DOM Manipulation",
                type: "video",
                url: "https://example.com/dom-manipulation",
                duration: "30 min",
              },
            ],
          },
          {
            id: "u18",
            title: "Web Development Quiz",
            type: "quiz",
            duration: "45 min",
            completed: false,
            questions: 15,
          },
        ],
      },
    ],
    recommendations: [
      {
        id: "rec1",
        title: "Advanced Data Structures",
        type: "course",
        provider: "MIT OpenCourseWare",
        duration: "8 weeks",
        rating: 4.8,
        url: "https://example.com/advanced-ds",
      },
      {
        id: "rec2",
        title: "Algorithms: Design and Analysis",
        type: "course",
        provider: "Stanford Online",
        duration: "6 weeks",
        rating: 4.9,
        url: "https://example.com/algorithms-design",
      },
      {
        id: "rec3",
        title: "Introduction to Machine Learning",
        type: "course",
        provider: "Coursera",
        duration: "10 weeks",
        rating: 4.7,
        url: "https://example.com/intro-ml",
      },
    ],
  },
};

const InteractiveLearningPath: React.FC<InteractiveLearningPathProps> = ({
  field = "Computer Science",
}) => {
  const [activeTab, setActiveTab] = useState("path");
  const [expandedModule, setExpandedModule] = useState<string | null>("m1");
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  // Get learning path data based on field
  const pathData = learningPathData[field] || learningPathData["Computer Science"];

  const handleModuleClick = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleUnitClick = (unitId: string) => {
    setSelectedUnit(unitId);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "code":
        return <Code className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getUnitIcon = (type: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }

    switch (type) {
      case "lesson":
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case "quiz":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "project":
        return <Code className="h-5 w-5 text-amber-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-blue-500" />;
    }
  };

  // Find the selected unit details
  const selectedUnitDetails = selectedUnit
    ? pathData.modules
        .flatMap((module) => module.units)
        .find((unit) => unit.id === selectedUnit)
    : null;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {pathData.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {pathData.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Overall Progress</p>
              <p className="text-2xl font-bold">{pathData.progress}%</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center relative">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={
                    2 * Math.PI * 28 * (1 - pathData.progress / 100)
                  }
                  className="text-primary"
                />
              </svg>
              <span className="absolute text-xs font-medium">
                {pathData.progress}%
              </span>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="path"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="path">Learning Path</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="path" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-6">
                {/* Module List */}
                {pathData.modules.map((module) => (
                  <Card
                    key={module.id}
                    className={`${module.locked ? "opacity-60" : ""} ${expandedModule === module.id ? "ring-2 ring-primary" : ""}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            {module.completed ? (
                              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            ) : (
                              <BookOpen className="h-5 w-5 mr-2 text-primary" />
                            )}
                            {module.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {module.description}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleModuleClick(module.id)}
                          disabled={module.locked}
                        >
                          {expandedModule === module.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {module.units.length} units
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {module.progress}%
                          </span>{" "}
                          complete
                        </div>
                      </div>
                      <Progress
                        value={module.progress}
                        className="h-2 mt-2"
                      />
                    </CardContent>
                    {expandedModule === module.id && (
                      <CardContent className="pt-0">
                        <div className="mt-4 space-y-2">
                          {module.units.map((unit) => (
                            <div
                              key={unit.id}
                              className={`p-3 rounded-md cursor-pointer transition-colors ${selectedUnit === unit.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"}`}
                              onClick={() => handleUnitClick(unit.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                  {getUnitIcon(unit.type, unit.completed)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">
                                    {unit.title}
                                  </h4>
                                  <div className="flex items-center mt-1">
                                    <Badge
                                      variant="outline"
                                      className="text-xs font-normal"
                                    >
                                      {unit.type}
                                    </Badge>
                                    <div className="flex items-center ml-2 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {unit.duration}
                                    </div>
                                  </div>
                                </div>
                                {unit.completed ? (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Completed
                                  </Badge>
                                ) : (
                                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                    <CardFooter>
                      <Button
                        variant={module.completed ? "outline" : "default"}
                        className="w-full"
                        disabled={module.locked}
                      >
                        {module.completed
                          ? "Review Module"
                          : module.locked
                          ? "Locked"
                          : "Continue Module"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="md:col-span-2">
                {selectedUnitDetails ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            {getUnitIcon(
                              selectedUnitDetails.type,
                              selectedUnitDetails.completed
                            )}
                            <span className="ml-2">
                              {selectedUnitDetails.title}
                            </span>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {selectedUnitDetails.type.charAt(0).toUpperCase() +
                              selectedUnitDetails.type.slice(1)}{" "}
                            • {selectedUnitDetails.duration}
                          </CardDescription>
                        </div>
                        {selectedUnitDetails.completed ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedUnitDetails.type === "quiz" ? (
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Quiz Overview</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                                <span>
                                  {selectedUnitDetails.questions} Questions
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                                <span>{selectedUnitDetails.duration}</span>
                              </div>
                            </div>
                          </div>
                          <p>
                            This quiz will test your knowledge on the topics
                            covered in this module. You need to score at least
                            70% to pass.
                          </p>
                          <div className="flex justify-center">
                            <Button className="mt-4">
                              <Play className="h-4 w-4 mr-2" />
                              Start Quiz
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="font-medium">Learning Resources</h3>
                            {selectedUnitDetails.resources?.map((resource) => (
                              <div
                                key={resource.id}
                                className="border