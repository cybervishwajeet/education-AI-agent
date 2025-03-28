import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Code,
  Server,
  Database,
  Globe,
  Cpu,
  Layers,
  Search,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Roadmap category type
interface RoadmapCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Roadmap item type
interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  url: string;
  topics?: RoadmapTopic[];
}

// Roadmap topic type
interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  resources: string[];
}

// Component props
interface RoadmapExplorerProps {
  initialCategory?: string;
}

// Roadmap categories
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

// Mock roadmap data
const mockRoadmapData: Record<string, RoadmapItem[]> = {
  frontend: [
    {
      id: "html",
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML structure and semantics",
      url: "https://roadmap.sh/frontend",
      topics: [
        {
          id: "html-basics",
          title: "HTML Basics",
          description:
            "Understanding HTML tags, attributes, and document structure",
          resources: [
            "MDN Web Docs - HTML Basics",
            "W3Schools HTML Tutorial",
            "freeCodeCamp HTML Course",
          ],
        },
        {
          id: "html-semantics",
          title: "Semantic HTML",
          description:
            "Using semantic elements for better accessibility and SEO",
          resources: [
            "MDN Web Docs - Semantic HTML",
            "HTML5 Doctor - Semantics",
            "Web.dev - Semantic Structure",
          ],
        },
      ],
    },
    {
      id: "css",
      title: "CSS Styling",
      description: "Master CSS for styling web pages",
      url: "https://roadmap.sh/frontend",
      topics: [
        {
          id: "css-basics",
          title: "CSS Basics",
          description: "Selectors, properties, values, and the box model",
          resources: [
            "MDN Web Docs - CSS Basics",
            "CSS-Tricks - A Complete Guide to CSS",
            "freeCodeCamp CSS Course",
          ],
        },
        {
          id: "css-layout",
          title: "CSS Layout",
          description: "Flexbox, Grid, and responsive design techniques",
          resources: [
            "CSS-Tricks - A Complete Guide to Flexbox",
            "CSS-Tricks - A Complete Guide to Grid",
            "web.dev - Responsive Design",
          ],
        },
      ],
    },
    {
      id: "javascript",
      title: "JavaScript Essentials",
      description: "Learn core JavaScript concepts and DOM manipulation",
      url: "https://roadmap.sh/javascript",
      topics: [
        {
          id: "js-basics",
          title: "JavaScript Basics",
          description: "Variables, data types, functions, and control flow",
          resources: [
            "MDN Web Docs - JavaScript Guide",
            "JavaScript.info - The Modern JavaScript Tutorial",
            "Eloquent JavaScript Book",
          ],
        },
        {
          id: "dom-manipulation",
          title: "DOM Manipulation",
          description:
            "Selecting, modifying, and creating HTML elements with JavaScript",
          resources: [
            "MDN Web Docs - DOM Introduction",
            "JavaScript.info - DOM Nodes",
            "freeCodeCamp - DOM Manipulation",
          ],
        },
      ],
    },
    {
      id: "frameworks",
      title: "Frontend Frameworks",
      description: "Explore React, Vue, Angular and other frameworks",
      url: "https://roadmap.sh/frontend",
      topics: [
        {
          id: "react",
          title: "React",
          description:
            "Component-based UI library for building interactive interfaces",
          resources: [
            "React Official Documentation",
            "React Tutorial for Beginners",
            "freeCodeCamp React Course",
          ],
        },
        {
          id: "vue",
          title: "Vue.js",
          description: "Progressive JavaScript framework for building UIs",
          resources: [
            "Vue.js Official Documentation",
            "Vue Mastery Courses",
            "Vue School Tutorials",
          ],
        },
      ],
    },
  ],
  backend: [
    {
      id: "languages",
      title: "Backend Languages",
      description: "Choose and learn a backend programming language",
      url: "https://roadmap.sh/backend",
      topics: [
        {
          id: "nodejs",
          title: "Node.js",
          description: "JavaScript runtime for server-side applications",
          resources: [
            "Node.js Official Documentation",
            "Node.js Crash Course",
            "freeCodeCamp Node.js Course",
          ],
        },
        {
          id: "python",
          title: "Python",
          description:
            "Versatile language with frameworks like Django and Flask",
          resources: [
            "Python Official Documentation",
            "Django Documentation",
            "Flask Documentation",
          ],
        },
      ],
    },
    {
      id: "apis",
      title: "API Development",
      description: "Learn to build RESTful and GraphQL APIs",
      url: "https://roadmap.sh/backend",
      topics: [
        {
          id: "rest",
          title: "REST APIs",
          description: "Representational State Transfer architectural style",
          resources: [
            "RESTful API Design Best Practices",
            "Building RESTful Services with Node.js",
            "API Documentation with Swagger",
          ],
        },
        {
          id: "graphql",
          title: "GraphQL",
          description: "Query language for your API with a single endpoint",
          resources: [
            "GraphQL Official Documentation",
            "How to GraphQL Tutorial",
            "Apollo GraphQL Documentation",
          ],
        },
      ],
    },
  ],
  devops: [
    {
      id: "cicd",
      title: "CI/CD Pipelines",
      description: "Set up continuous integration and deployment",
      url: "https://roadmap.sh/devops",
      topics: [
        {
          id: "jenkins",
          title: "Jenkins",
          description: "Open-source automation server for CI/CD",
          resources: [
            "Jenkins Official Documentation",
            "Jenkins Pipeline Tutorial",
            "Jenkins for DevOps",
          ],
        },
        {
          id: "github-actions",
          title: "GitHub Actions",
          description:
            "Automate workflows directly from your GitHub repository",
          resources: [
            "GitHub Actions Documentation",
            "GitHub Actions for CI/CD",
            "Automating Your Workflow with GitHub Actions",
          ],
        },
      ],
    },
    {
      id: "containers",
      title: "Containerization",
      description: "Learn Docker and container orchestration",
      url: "https://roadmap.sh/devops",
      topics: [
        {
          id: "docker",
          title: "Docker",
          description:
            "Platform for developing, shipping, and running applications in containers",
          resources: [
            "Docker Official Documentation",
            "Docker for Beginners",
            "Docker Compose Tutorial",
          ],
        },
        {
          id: "kubernetes",
          title: "Kubernetes",
          description:
            "Container orchestration platform for automating deployment and scaling",
          resources: [
            "Kubernetes Official Documentation",
            "Kubernetes Basics Tutorial",
            "Kubernetes the Hard Way",
          ],
        },
      ],
    },
  ],
};

const RoadmapExplorer: React.FC<RoadmapExplorerProps> = ({
  initialCategory = "frontend",
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

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

  // Toggle topic completion
  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId],
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Interactive Roadmap Explorer
        </h1>
        <p className="text-slate-400 mt-2">
          Explore career paths and learning resources based on roadmap.sh
        </p>
      </div>

      {/* Roadmap Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {roadmapCategories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all hover:scale-105 ${selectedCategory === category.id ? "border-blue-500 ring-1 ring-blue-500 bg-slate-800" : "bg-slate-800 border-slate-700"}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
              >
                {category.icon}
              </div>
              <p className="font-medium text-sm text-slate-300">
                {category.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="relative mb-6">
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
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on roadmap.sh
                    </Button>
                  </div>
                </CardHeader>

                {item.topics && (
                  <CardContent className="pt-0">
                    <Accordion
                      type="single"
                      collapsible
                      value={expandedItem === item.id ? item.id : undefined}
                      onValueChange={(value) => setExpandedItem(value)}
                    >
                      <AccordionItem
                        value={item.id}
                        className="border-slate-700"
                      >
                        <AccordionTrigger className="text-slate-300 hover:text-white hover:no-underline py-2">
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-blue-400" />
                            Learning Topics
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            {item.topics.map((topic) => (
                              <div
                                key={topic.id}
                                className={`p-3 rounded-lg border ${completedTopics.includes(topic.id) ? "bg-green-900/20 border-green-800" : "bg-slate-700/50 border-slate-600"}`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-white flex items-center">
                                      {completedTopics.includes(topic.id) && (
                                        <CheckCircle className="h-4 w-4 mr-1.5 text-green-400" />
                                      )}
                                      {topic.title}
                                    </h4>
                                    <p className="text-sm text-slate-400 mt-1">
                                      {topic.description}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-7 px-2 ${completedTopics.includes(topic.id) ? "text-green-400 hover:text-green-300" : "text-blue-400 hover:text-blue-300"}`}
                                    onClick={() =>
                                      toggleTopicCompletion(topic.id)
                                    }
                                  >
                                    {completedTopics.includes(topic.id)
                                      ? "Completed"
                                      : "Mark Complete"}
                                  </Button>
                                </div>

                                <div className="mt-3">
                                  <h5 className="text-xs font-medium text-slate-300 mb-2">
                                    Resources:
                                  </h5>
                                  <ul className="space-y-1">
                                    {topic.resources.map((resource, idx) => (
                                      <li
                                        key={idx}
                                        className="text-xs text-slate-400 flex items-center"
                                      >
                                        <ChevronRight className="h-3 w-3 mr-1 text-slate-500" />
                                        {resource}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                )}
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

      {/* Roadmap.sh Attribution */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Data sourced from{" "}
          <a
            href="https://roadmap.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            roadmap.sh
          </a>
          , a community effort to create roadmaps, guides and other educational
          content for developers.
        </p>
      </div>
    </div>
  );
};

export default RoadmapExplorer;
