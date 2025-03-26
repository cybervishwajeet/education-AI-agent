import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Award,
  Lock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "document" | "quiz";
  source: string;
  url: string;
  completed: boolean;
  locked: boolean;
}

interface LearningNode {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
  progress: number;
  locked: boolean;
}

interface LearningPathProps {
  title?: string;
  description?: string;
  field?: string;
  nodes?: LearningNode[];
  overallProgress?: number;
}

const defaultNodes: LearningNode[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming concepts and syntax",
    resources: [
      {
        id: "1-1",
        title: "Programming Fundamentals",
        type: "article",
        source: "Google",
        url: "https://example.com/programming-fundamentals",
        completed: true,
        locked: false,
      },
      {
        id: "1-2",
        title: "Getting Started with Coding",
        type: "video",
        source: "YouTube",
        url: "https://example.com/getting-started-coding",
        completed: true,
        locked: false,
      },
      {
        id: "1-3",
        title: "Basic Programming Quiz",
        type: "quiz",
        source: "Internal",
        url: "/quiz/basic-programming",
        completed: false,
        locked: false,
      },
    ],
    completed: false,
    progress: 66,
    locked: false,
  },
  {
    id: "2",
    title: "Web Development Basics",
    description: "Understand HTML, CSS, and JavaScript fundamentals",
    resources: [
      {
        id: "2-1",
        title: "HTML & CSS Crash Course",
        type: "video",
        source: "YouTube",
        url: "https://example.com/html-css-crash-course",
        completed: true,
        locked: false,
      },
      {
        id: "2-2",
        title: "JavaScript Essentials",
        type: "document",
        source: "Google",
        url: "https://example.com/javascript-essentials",
        completed: false,
        locked: false,
      },
    ],
    completed: false,
    progress: 50,
    locked: false,
  },
  {
    id: "3",
    title: "Advanced Programming Concepts",
    description: "Dive into object-oriented programming and data structures",
    resources: [
      {
        id: "3-1",
        title: "Object-Oriented Programming",
        type: "article",
        source: "Google",
        url: "https://example.com/oop-concepts",
        completed: false,
        locked: true,
      },
      {
        id: "3-2",
        title: "Data Structures Explained",
        type: "video",
        source: "YouTube",
        url: "https://example.com/data-structures",
        completed: false,
        locked: true,
      },
    ],
    completed: false,
    progress: 0,
    locked: true,
  },
  {
    id: "4",
    title: "Building Real-World Projects",
    description: "Apply your knowledge by building practical applications",
    resources: [
      {
        id: "4-1",
        title: "Project Planning and Architecture",
        type: "document",
        source: "Google",
        url: "https://example.com/project-planning",
        completed: false,
        locked: true,
      },
      {
        id: "4-2",
        title: "Building Your First App",
        type: "video",
        source: "YouTube",
        url: "https://example.com/first-app-tutorial",
        completed: false,
        locked: true,
      },
      {
        id: "4-3",
        title: "Project Showcase",
        type: "quiz",
        source: "Internal",
        url: "/quiz/project-showcase",
        completed: false,
        locked: true,
      },
    ],
    completed: false,
    progress: 0,
    locked: true,
  },
];

const ResourceIcon = ({ type }: { type: Resource["type"] }) => {
  switch (type) {
    case "article":
      return <FileText className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "document":
      return <BookOpen className="h-4 w-4" />;
    case "quiz":
      return <Award className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const LearningPath: React.FC<LearningPathProps> = ({
  title = "Your AI-Generated Learning Path",
  description = "Personalized roadmap based on your education field and interests",
  field = "Computer Science",
  nodes = defaultNodes,
  overallProgress = 35,
}) => {
  const [expandedNode, setExpandedNode] = useState<string | null>(nodes[0].id);

  const toggleNode = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {field}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-medium">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      <div className="space-y-6">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative">
            {index < nodes.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border z-0" />
            )}

            <Card
              className={cn(
                "relative z-10 transition-all duration-300",
                node.locked ? "opacity-60" : "hover:shadow-md",
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full text-white",
                        node.completed
                          ? "bg-green-500"
                          : node.locked
                            ? "bg-gray-400"
                            : "bg-primary",
                      )}
                    >
                      {node.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : node.locked ? (
                        <Lock className="h-6 w-6" />
                      ) : (
                        <span className="text-lg font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <CardTitle>{node.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {node.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleNode(node.id)}
                    disabled={node.locked}
                    className="shrink-0"
                  >
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 transition-transform",
                        expandedNode === node.id && "rotate-90",
                      )}
                    />
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-xs font-medium">
                      {node.progress}%
                    </span>
                  </div>
                  <Progress value={node.progress} className="h-1.5" />
                </div>
              </CardHeader>

              {expandedNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-4">
                    <h4 className="text-sm font-semibold mb-3">
                      Learning Resources
                    </h4>
                    <ul className="space-y-3">
                      {node.resources.map((resource) => (
                        <li key={resource.id}>
                          <div
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg border",
                              resource.completed ? "bg-muted/50" : "bg-card",
                              resource.locked
                                ? "opacity-60"
                                : "hover:bg-accent/50",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-full",
                                  resource.completed
                                    ? "bg-green-100 text-green-600"
                                    : "bg-primary/10 text-primary",
                                )}
                              >
                                <ResourceIcon type={resource.type} />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {resource.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {resource.source}
                                </p>
                              </div>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={resource.locked}
                                    className="h-8 w-8"
                                    onClick={() =>
                                      window.open(resource.url, "_blank")
                                    }
                                  >
                                    {resource.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : resource.locked ? (
                                      <Lock className="h-4 w-4" />
                                    ) : (
                                      <ExternalLink className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {resource.completed
                                    ? "Completed"
                                    : resource.locked
                                      ? "Locked"
                                      : "Open Resource"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto"
                      disabled={node.locked || node.completed}
                    >
                      {node.completed ? "Completed" : "Mark as Complete"}
                    </Button>
                  </CardFooter>
                </motion.div>
              )}
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          This learning path is personalized based on your education field and
          interests.
        </p>
        <Button>Refresh Learning Path</Button>
      </div>
    </div>
  );
};

export default LearningPath;
