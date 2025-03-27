import React from "react";
import { ExternalLink, TrendingUp, BookOpen, Code, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrendingNewsItem {
  id: string;
  title: string;
  description: string;
  category: "technology" | "course" | "programming" | "career";
  url: string;
}

interface TrendingNewsProps {
  items?: TrendingNewsItem[];
  title?: string;
}

const TrendingNews = ({
  items = [
    {
      id: "1",
      title: "Introduction to Machine Learning",
      description:
        "Learn the fundamentals of machine learning algorithms and applications.",
      category: "technology",
      url: "https://example.com/machine-learning",
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      description:
        "Comprehensive course covering frontend and backend technologies.",
      category: "course",
      url: "https://example.com/web-dev",
    },
    {
      id: "3",
      title: "Python for Data Science",
      description:
        "Master Python programming for data analysis and visualization.",
      category: "programming",
      url: "https://example.com/python-data-science",
    },
    {
      id: "4",
      title: "Emerging Tech Careers in 2023",
      description:
        "Explore the most in-demand technology career paths this year.",
      category: "career",
      url: "https://example.com/tech-careers",
    },
  ],
  title = "Trending in Technology",
}: TrendingNewsProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technology":
        return <TrendingUp className="h-4 w-4 mr-1" />;
      case "course":
        return <BookOpen className="h-4 w-4 mr-1" />;
      case "programming":
        return <Code className="h-4 w-4 mr-1" />;
      case "career":
        return <Zap className="h-4 w-4 mr-1" />;
      default:
        return <TrendingUp className="h-4 w-4 mr-1" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technology":
        return "text-blue-400";
      case "course":
        return "text-green-400";
      case "programming":
        return "text-purple-400";
      case "career":
        return "text-amber-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <Card className="w-full h-full bg-slate-800 overflow-hidden border-slate-700">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto max-h-[400px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-b border-slate-700 pb-3 last:border-0"
            >
              <div className="flex items-center mb-1">
                <span
                  className={`flex items-center text-sm font-medium ${getCategoryColor(item.category)}`}
                >
                  {getCategoryIcon(item.category)}
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </span>
              </div>
              <h3 className="font-semibold text-base mb-1 text-white">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 mb-2">{item.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-400 p-0 h-auto font-medium flex items-center hover:text-indigo-300 hover:bg-transparent"
                onClick={() => window.open(item.url, "_blank")}
              >
                Learn more
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-slate-700 border-t border-slate-600 p-3">
        <Button
          variant="outline"
          size="sm"
          className="text-sm w-full bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
          onClick={() =>
            window.open("https://example.com/all-trends", "_blank")
          }
        >
          View all trending topics
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrendingNews;
