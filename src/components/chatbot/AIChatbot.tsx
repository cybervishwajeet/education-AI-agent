import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Bot,
  Sparkles,
  Mic,
  MicOff,
  X,
  Code,
  Link,
  FileText,
  Image,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "code" | "link" | "image";
  metadata?: {
    title?: string;
    url?: string;
    language?: string;
    imageUrl?: string;
  };
}

interface AIChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  userField?: string;
}

const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen = true,
  onClose = () => {},
  userName = "Student",
  userField = "Computer Science",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello ${userName}! I'm your AI learning assistant. How can I help with your ${userField} studies today?`,
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "resources">("chat");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Suggested questions based on user field
  const suggestedQuestions = [
    `What are the key concepts I should learn first in ${userField}?`,
    `Can you recommend resources for beginners in ${userField}?`,
    `What career paths are available in ${userField}?`,
    `Create a quiz to test my knowledge of ${userField}`,
  ];

  // Sample resources based on user field
  const sampleResources = [
    {
      id: "r1",
      title: `Introduction to ${userField}`,
      type: "article",
      source: "Educational Resource",
      url: "https://example.com/intro",
    },
    {
      id: "r2",
      title: `${userField} Tutorial for Beginners`,
      type: "video",
      source: "YouTube",
      url: "https://example.com/tutorial",
    },
    {
      id: "r3",
      title: `Advanced ${userField} Concepts`,
      type: "document",
      source: "Academic Paper",
      url: "https://example.com/advanced",
    },
  ];

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with different content types
    setTimeout(() => {
      setIsTyping(false);

      // Determine if we should send a special response based on keywords
      const lowerCaseInput = inputValue.toLowerCase();

      if (
        lowerCaseInput.includes("code") ||
        lowerCaseInput.includes("example") ||
        lowerCaseInput.includes("function")
      ) {
        // Send code snippet
        const codeMessage: Message = {
          id: Date.now().toString(),
          content: `Here's a code example that demonstrates this concept:`,
          sender: "ai",
          timestamp: new Date(),
          type: "code",
          metadata: {
            language: "javascript",
            title: "Example Function",
          },
        };

        setMessages((prev) => [...prev, codeMessage]);

        // Add code snippet as a separate message
        setTimeout(() => {
          const codeSnippet: Message = {
            id: (Date.now() + 1).toString(),
            content: `function calculateAverage(numbers) {\n  if (numbers.length === 0) return 0;\n  \n  const sum = numbers.reduce((total, num) => total + num, 0);\n  return sum / numbers.length;\n}\n\n// Example usage\nconst scores = [85, 90, 78, 92, 88];\nconst averageScore = calculateAverage(scores);\nconsole.log(\`The average score is: \${averageScore}\`);`,
            sender: "ai",
            timestamp: new Date(),
            type: "code",
            metadata: {
              language: "javascript",
            },
          };

          setMessages((prev) => [...prev, codeSnippet]);

          // Follow up with explanation
          setTimeout(() => {
            const explanation: Message = {
              id: (Date.now() + 2).toString(),
              content: `This function takes an array of numbers, calculates their sum using the reduce method, and then divides by the length of the array to get the average. Would you like me to explain any specific part in more detail?`,
              sender: "ai",
              timestamp: new Date(),
              type: "text",
            };

            setMessages((prev) => [...prev, explanation]);
          }, 1000);
        }, 1000);

        return;
      }

      if (
        lowerCaseInput.includes("resource") ||
        lowerCaseInput.includes("link") ||
        lowerCaseInput.includes("article")
      ) {
        // Send resource link
        const linkMessage: Message = {
          id: Date.now().toString(),
          content: `I found this excellent resource that explains the topic in detail:`,
          sender: "ai",
          timestamp: new Date(),
          type: "link",
          metadata: {
            title: `${userField} Fundamentals: A Comprehensive Guide`,
            url: "https://example.com/comprehensive-guide",
          },
        };

        setMessages((prev) => [...prev, linkMessage]);
        return;
      }

      if (
        lowerCaseInput.includes("visual") ||
        lowerCaseInput.includes("diagram") ||
        lowerCaseInput.includes("image")
      ) {
        // Send image
        const imageMessage: Message = {
          id: Date.now().toString(),
          content: `Here's a visual representation that might help:`,
          sender: "ai",
          timestamp: new Date(),
          type: "image",
          metadata: {
            imageUrl:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
            title: `${userField} Concept Visualization`,
          },
        };

        setMessages((prev) => [...prev, imageMessage]);
        return;
      }

      // Default text response
      const aiResponses = [
        `Based on your ${userField} studies, I'd recommend focusing on these key concepts first: 

1. Fundamental principles of ${userField}
2. Core methodologies and frameworks
3. Practical applications and case studies

Would you like me to elaborate on any of these areas?`,

        `Here's a structured learning path for ${userField}:

1. **Beginner Level**: Start with basic concepts and terminology
2. **Intermediate Level**: Explore practical applications and techniques
3. **Advanced Level**: Master complex theories and specialized topics

What level are you currently at?`,

        `That's a great question! Let me break down the answer for you:

The concept you're asking about is fundamental to ${userField} because it establishes the foundation for more advanced topics. Understanding this will help you grasp related concepts like data structures, algorithms, and system design.`,

        `I've analyzed your learning pattern and suggest trying this approach:

1. Start with interactive tutorials to build practical skills
2. Supplement with theoretical readings to understand the "why" behind concepts
3. Apply your knowledge through small projects
4. Join study groups or forums to discuss complex topics

Would this approach work for your learning style?`,

        `Would you like me to create a quiz on this topic to test your understanding? I can generate questions of varying difficulty levels to help reinforce your knowledge of ${userField}.`,
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Simulate voice recording and transcription
      setTimeout(() => {
        setInputValue(`Tell me about the fundamentals of ${userField}`);
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    // Optional: auto-send the question
    // setTimeout(handleSendMessage, 100);
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col bg-background border shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=aibot"
                alt="AI Assistant"
              />
              <AvatarFallback>
                <Bot size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">AI Learning Assistant</CardTitle>
              <p className="text-xs text-muted-foreground">
                Powered by advanced AI
              </p>
            </div>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "chat" | "resources")
            }
            className="hidden sm:block"
          >
            <TabsList className="h-8">
              <TabsTrigger value="chat" className="text-xs px-3">
                Chat
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-xs px-3">
                Resources
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8"
            >
              <X size={16} />
              <span className="sr-only">Close</span>
            </Button>
          </motion.div>
        </div>
      </CardHeader>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "chat" | "resources")}
        className="flex-grow flex flex-col"
      >
        <TabsContent value="chat" className="flex-grow flex flex-col m-0 p-0">
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground p-3"
                        : "bg-muted p-3"
                    }`}
                  >
                    {message.type === "text" && (
                      <div className="flex items-start gap-2">
                        {message.sender === "ai" && (
                          <Sparkles
                            size={16}
                            className="mt-1 text-yellow-500 flex-shrink-0"
                          />
                        )}
                        <div>
                          <p className="text-sm whitespace-pre-line">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    {message.type === "code" && (
                      <div className="space-y-2">
                        {message.metadata?.title && (
                          <div className="flex items-center gap-2">
                            <Code size={16} className="text-yellow-500" />
                            <p className="text-sm font-medium">
                              {message.metadata.title}
                            </p>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        {message.content.includes("function") && (
                          <div className="bg-slate-900 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
                            <pre>{message.content}</pre>
                          </div>
                        )}
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )}

                    {message.type === "link" && (
                      <div className="space-y-2">
                        <p className="text-sm">{message.content}</p>
                        <div className="border rounded-md p-3 bg-background/50">
                          <div className="flex items-center gap-2">
                            <Link size={16} className="text-blue-500" />
                            <p className="text-sm font-medium">
                              {message.metadata?.title}
                            </p>
                          </div>
                          <a
                            href={message.metadata?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline mt-1 block"
                          >
                            {message.metadata?.url}
                          </a>
                        </div>
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )}

                    {message.type === "image" && (
                      <div className="space-y-2">
                        <p className="text-sm">{message.content}</p>
                        <div className="rounded-md overflow-hidden">
                          <img
                            src={message.metadata?.imageUrl}
                            alt={
                              message.metadata?.title || "AI generated image"
                            }
                            className="w-full h-auto"
                          />
                        </div>
                        <p className="text-xs text-center italic">
                          {message.metadata?.title}
                        </p>
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-primary/60 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-primary/60 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-primary/60 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        AI is typing...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested questions */}
            {messages.length < 3 && (
              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-2">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 transition-colors py-1"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          <CardFooter className="p-3 border-t bg-card">
            <div className="flex w-full items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 flex-shrink-0"
                onClick={toggleRecording}
              >
                {isRecording ? (
                  <MicOff size={18} className="text-red-500" />
                ) : (
                  <Mic size={18} />
                )}
                <span className="sr-only">
                  {isRecording ? "Stop recording" : "Start voice input"}
                </span>
              </Button>

              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isRecording
                    ? "Listening..."
                    : "Ask me anything about your studies..."
                }
                className="flex-grow bg-muted/50"
                disabled={isRecording}
              />

              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputValue.trim() || isRecording}
                className="rounded-full h-8 w-8 flex-shrink-0 bg-primary"
              >
                <Send size={16} />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="resources" className="flex-grow m-0 p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">
                Recommended Resources for {userField}
              </h3>

              <div className="space-y-3">
                {sampleResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="border rounded-md p-3 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-primary/10 p-2 rounded-md">
                        {resource.type === "article" && (
                          <FileText size={16} className="text-primary" />
                        )}
                        {resource.type === "video" && (
                          <Image size={16} className="text-primary" />
                        )}
                        {resource.type === "document" && (
                          <FileText size={16} className="text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {resource.source}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                          >
                            <Link size={12} className="mr-1" />
                            Open Resource
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t mt-6">
                <h3 className="text-sm font-medium mb-3">Learning Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Course Completion</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Quiz Performance</span>
                      <span>42%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIChatbot;
