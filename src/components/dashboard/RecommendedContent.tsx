import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Video, ExternalLink, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "course" | "tutorial";
  source: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  rating: number;
  url: string;
  imageUrl: string;
}

interface RecommendedContentProps {
  resources?: Resource[];
  title?: string;
  description?: string;
}

const ResourceTypeIcon = ({ type }: { type: Resource["type"] }) => {
  switch (type) {
    case "article":
      return <BookOpen className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "course":
      return <BookOpen className="h-4 w-4" />;
    case "tutorial":
      return <Code className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const DifficultyBadge = ({
  difficulty,
}: {
  difficulty: Resource["difficulty"];
}) => {
  const colorMap = {
    beginner: "bg-green-900/50 text-green-300 border-green-700",
    intermediate: "bg-blue-900/50 text-blue-300 border-blue-700",
    advanced: "bg-purple-900/50 text-purple-300 border-purple-700",
  };

  return (
    <Badge
      variant="outline"
      className={cn(colorMap[difficulty], "font-normal")}
    >
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="h-full flex flex-col bg-slate-800 hover:shadow-md transition-shadow duration-200 border-slate-700">
      <div className="relative h-40 overflow-hidden rounded-t-xl">
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1 text-white">
            {resource.title}
          </CardTitle>
          <DifficultyBadge difficulty={resource.difficulty} />
        </div>
        <CardDescription className="line-clamp-2 text-slate-400">
          {resource.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <ResourceTypeIcon type={resource.type} />
          <span className="capitalize">{resource.type}</span>
          <span className="mx-1">•</span>
          <span>{resource.source}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-4 w-4" />
          <span>{resource.duration}</span>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1">{resource.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
          asChild
        >
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span>View Resource</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const RecommendedContent = ({
  resources = [
    {
      id: "1",
      title: "Introduction to Machine Learning",
      description:
        "A comprehensive guide to understanding the basics of machine learning algorithms and their applications.",
      type: "course",
      source: "Coursera",
      difficulty: "beginner",
      duration: "8 weeks",
      rating: 4.8,
      url: "https://example.com/course1",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },
    {
      id: "2",
      title: "Advanced Data Structures",
      description:
        "Learn about complex data structures and algorithms for efficient problem-solving in computer science.",
      type: "video",
      source: "YouTube",
      difficulty: "intermediate",
      duration: "2 hours",
      rating: 4.5,
      url: "https://example.com/video1",
      imageUrl:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
      id: "3",
      title: "Neural Networks and Deep Learning",
      description:
        "Explore the fundamentals of neural networks and how to implement deep learning models.",
      type: "article",
      source: "Medium",
      difficulty: "advanced",
      duration: "25 min read",
      rating: 4.7,
      url: "https://example.com/article1",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
      id: "4",
      title: "Building RESTful APIs with Node.js",
      description:
        "A step-by-step tutorial on creating robust and scalable RESTful APIs using Node.js and Express.",
      type: "tutorial",
      source: "Dev.to",
      difficulty: "intermediate",
      duration: "1.5 hours",
      rating: 4.6,
      url: "https://example.com/tutorial1",
      imageUrl:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    },
  ],
  title = "Recommended Learning Resources",
  description = "AI-curated content based on your learning preferences and education field",
}: RecommendedContentProps) => {
  return (
    <div className="w-full bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="text-slate-400 mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedContent;
