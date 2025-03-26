import React, { useState, useEffect } from "react";
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
  Search,
  Code,
  Database,
  Server,
  Globe,
  Layers,
  Cpu,
  RefreshCw,
  Filter,
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

// Roadmap.sh API integration types
interface RoadmapCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

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

// Mock roadmap categories that would come from roadmap.sh API
const roadmapCategories: RoadmapCategory[] = [
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

// Mock roadmap data that would come from roadmap.sh API
const mockRoadmapData: Record<string, RoadmapItem[]> = {
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
  title = "Interactive Learning Roadmap",
  description = "Explore career paths and learning resources based on roadmap.sh",
  field = "Computer Science",
  nodes = defaultNodes,
  overallProgress = 35,
}) => {
  const [expandedNode, setExpandedNode] = useState<string | null>(nodes[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>("frontend");
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"roadmap" | "learning">("roadmap");

  // Fetch roadmap data when category changes
  useEffect(() => {
    const fetchRoadmapData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call to roadmap.sh
        // const response = await fetch(`https://api.roadmap.sh/roadmaps/${selectedCategory}`);
        // const data = await response.json();

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

  const toggleNode = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  // Filter roadmap items based on search query
  const filteredRoadmapItems = roadmapItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          {title}
        </h1>
        <p className="text-muted-foreground mt-2">{description}</p>
        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant={viewMode === "roadmap" ? "default" : "outline"}
            onClick={() => setViewMode("roadmap")}
            className="rounded-full"
          >
            <Globe className="h-4 w-4 mr-2" />
            Roadmap Explorer
          </Button>
          <Button
            variant={viewMode === "learning" ? "default" : "outline"}
            onClick={() => setViewMode("learning")}
            className="rounded-full"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            My Learning Path
          </Button>
        </div>
      </div>

      {viewMode === "roadmap" ? (
        <div className="space-y-6">
          {/* Roadmap Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {roadmapCategories.map((category) => (
              <Card
                key={category.id}
                className={cn(
                  "cursor-pointer transition-all hover:scale-105",
                  selectedCategory === category.id
                    ? "border-primary ring-1 ring-primary"
                    : "",
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
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
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search roadmap items..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Roadmap Items */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredRoadmapItems.length > 0 ? (
              filteredRoadmapItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
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
                <p className="text-muted-foreground">
                  No roadmap items found. Try a different search or category.
                </p>
              </div>
            )}
          </div>

          {/* Backend Connection Comment */}
          <div className="mt-8 p-4 border border-dashed border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <Database className="h-4 w-4 mr-2 text-yellow-600" />
              Backend Integration Note
            </h3>
            <p className="text-sm text-muted-foreground">
              In a production environment, this component would connect to the
              roadmap.sh API or a custom backend service to fetch real roadmap
              data. The backend would:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside space-y-1">
              <li>Fetch and cache roadmap data from roadmap.sh</li>
              <li>Store user progress and completed items in a database</li>
              <li>
                Provide personalized recommendations based on user activity
              </li>
              <li>Sync learning progress across devices</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* Original Learning Path View */}
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
                            <span className="text-lg font-bold">
                              {index + 1}
                            </span>
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
                                  resource.completed
                                    ? "bg-muted/50"
                                    : "bg-card",
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
              This learning path is personalized based on your education field
              and interests.
            </p>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Learning Path
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningPath;
