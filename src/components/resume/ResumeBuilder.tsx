import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  Plus,
  Trash2,
  Edit,
  Save,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeBuilderProps {
  userName?: string;
  userField?: string;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a modern touch",
    color: "bg-blue-500",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    color: "bg-slate-700",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique and creative layout",
    color: "bg-purple-500",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional professional layout for corporate roles",
    color: "bg-emerald-600",
  },
];

const jobRecommendations = [
  {
    id: "job1",
    title: "Software Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    description:
      "Develop and maintain web applications using modern JavaScript frameworks.",
    match: 92,
  },
  {
    id: "job2",
    title: "Frontend Engineer",
    company: "WebSolutions Ltd.",
    location: "New York, NY",
    type: "Contract",
    description:
      "Create responsive and interactive user interfaces for enterprise applications.",
    match: 87,
  },
  {
    id: "job3",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Remote",
    type: "Full-time",
    description:
      "Work on both frontend and backend development for a growing startup.",
    match: 78,
  },
];

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  userName = "Alex Johnson",
  userField = "Computer Science",
}) => {
  const [activeTab, setActiveTab] = useState("builder");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: userName,
      title: "Software Developer",
      email: "alex@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      summary:
        "Passionate software developer with experience in web development and a strong foundation in computer science principles.",
    },
    experience: [
      {
        id: "exp1",
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        startDate: "2021-06",
        endDate: "Present",
        description:
          "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement UI/UX improvements.",
      },
      {
        id: "exp2",
        title: "Web Developer Intern",
        company: "Digital Innovations",
        location: "Remote",
        startDate: "2020-09",
        endDate: "2021-05",
        description:
          "Assisted in developing and maintaining company websites. Implemented new features and fixed bugs.",
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Bachelor of Science in Computer Science",
        institution: "Tech University",
        location: "Boston, MA",
        startDate: "2017-09",
        endDate: "2021-05",
        description: "GPA: 3.8/4.0. Dean's List all semesters.",
      },
    ],
    skills: [
      { id: "skill1", name: "JavaScript", level: "Advanced" },
      { id: "skill2", name: "React", level: "Advanced" },
      { id: "skill3", name: "TypeScript", level: "Intermediate" },
      { id: "skill4", name: "Node.js", level: "Intermediate" },
      { id: "skill5", name: "HTML/CSS", level: "Advanced" },
      { id: "skill6", name: "Git", level: "Intermediate" },
    ],
    projects: [
      {
        id: "proj1",
        title: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform with React, Node.js, and MongoDB.",
        link: "https://github.com/example/ecommerce",
      },
      {
        id: "proj2",
        title: "Task Management App",
        description:
          "Developed a task management application with React and Firebase.",
        link: "https://github.com/example/taskmanager",
      },
    ],
  });

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const generateAIContent = (section: string) => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      if (section === "summary") {
        setResumeData({
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            summary:
              `Innovative ${userField} professional with a passion for creating efficient, scalable solutions. ` +
              `Experienced in developing modern web applications with a focus on user experience and performance optimization. ` +
              `Skilled in collaborative environments and committed to continuous learning and growth in the rapidly evolving tech landscape.`,
          },
        });
      } else if (section === "skills") {
        // Add AI-generated skills based on user field
        const newSkills = [
          ...resumeData.skills,
          {
            id: `skill${Date.now()}`,
            name: "Problem Solving",
            level: "Advanced",
          },
          {
            id: `skill${Date.now() + 1}`,
            name: "System Design",
            level: "Intermediate",
          },
          {
            id: `skill${Date.now() + 2}`,
            name: "Data Structures",
            level: "Advanced",
          },
        ];
        setResumeData({
          ...resumeData,
          skills: newSkills,
        });
      }

      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Resume download functionality would be implemented here");
  };

  const handleAddItem = (section: string) => {
    if (section === "experience") {
      const newExperience = {
        id: `exp${Date.now()}`,
        title: "New Position",
        company: "Company Name",
        location: "Location",
        startDate: "",
        endDate: "",
        description: "Describe your responsibilities and achievements",
      };
      setResumeData({
        ...resumeData,
        experience: [...resumeData.experience, newExperience],
      });
    } else if (section === "education") {
      const newEducation = {
        id: `edu${Date.now()}`,
        degree: "Degree Name",
        institution: "Institution Name",
        location: "Location",
        startDate: "",
        endDate: "",
        description: "Describe your education details",
      };
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, newEducation],
      });
    } else if (section === "skills") {
      const newSkill = {
        id: `skill${Date.now()}`,
        name: "New Skill",
        level: "Beginner",
      };
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill],
      });
    } else if (section === "projects") {
      const newProject = {
        id: `proj${Date.now()}`,
        title: "New Project",
        description: "Describe your project",
        link: "",
      };
      setResumeData({
        ...resumeData,
        projects: [...resumeData.projects, newProject],
      });
    }
  };

  const handleRemoveItem = (section: string, id: string) => {
    if (section === "experience") {
      setResumeData({
        ...resumeData,
        experience: resumeData.experience.filter((item) => item.id !== id),
      });
    } else if (section === "education") {
      setResumeData({
        ...resumeData,
        education: resumeData.education.filter((item) => item.id !== id),
      });
    } else if (section === "skills") {
      setResumeData({
        ...resumeData,
        skills: resumeData.skills.filter((item) => item.id !== id),
      });
    } else if (section === "projects") {
      setResumeData({
        ...resumeData,
        projects: resumeData.projects.filter((item) => item.id !== id),
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              AI Resume Builder
            </h1>
            <p className="text-muted-foreground mt-1">
              Create a professional resume with AI assistance
            </p>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>

        <Tabs
          defaultValue="builder"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="builder">Resume Builder</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="jobs">Job Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Templates</CardTitle>
                    <CardDescription>
                      Choose a template for your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`border rounded-md overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:border-primary"}`}
                          onClick={() => handleTemplateChange(template.id)}
                        >
                          <div
                            className={`${template.color} h-20 flex items-center justify-center text-white font-medium`}
                          >
                            {template.name}
                          </div>
                          <div className="p-2 text-xs">
                            <p className="font-medium">{template.name}</p>
                            <p className="text-muted-foreground truncate">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-primary" />
                      AI Assistance
                    </CardTitle>
                    <CardDescription>
                      Let AI help you create the perfect resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => generateAIContent("summary")}
                      disabled={isGenerating}
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      {isGenerating
                        ? "Generating..."
                        : "Generate Professional Summary"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => generateAIContent("skills")}
                      disabled={isGenerating}
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      {isGenerating
                        ? "Generating..."
                        : "Suggest Relevant Skills"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      disabled={isGenerating}
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      Enhance Job Descriptions
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      disabled={isGenerating}
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      Tailor to Job Description
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <div className="space-y-6 pr-4">
                    {/* Personal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={resumeData.personalInfo.name}
                              onChange={(e) =>
                                handlePersonalInfoChange("name", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                              id="title"
                              value={resumeData.personalInfo.title}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "title",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={resumeData.personalInfo.email}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "email",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={resumeData.personalInfo.phone}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "phone",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={resumeData.personalInfo.location}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "location",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="summary">
                                Professional Summary
                              </Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => generateAIContent("summary")}
                                disabled={isGenerating}
                              >
                                <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
                                {isGenerating ? "Generating..." : "AI Generate"}
                              </Button>
                            </div>
                            <Textarea
                              id="summary"
                              rows={4}
                              value={resumeData.personalInfo.summary}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "summary",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Work Experience */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-2" />
                            Work Experience
                          </CardTitle>
                          <Button
                            size="sm"
                            onClick={() => handleAddItem("experience")}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Experience
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div
                            key={exp.id}
                            className="border rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{exp.title}</h3>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    setEditingSection(
                                      editingSection === `exp-${exp.id}`
                                        ? null
                                        : `exp-${exp.id}`,
                                    )
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() =>
                                    handleRemoveItem("experience", exp.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {editingSection === `exp-${exp.id}` ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Job Title</Label>
                                  <Input
                                    value={exp.title}
                                    onChange={(e) => {
                                      const updatedExp =
                                        resumeData.experience.map((item) =>
                                          item.id === exp.id
                                            ? { ...item, title: e.target.value }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        experience: updatedExp,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Company</Label>
                                  <Input
                                    value={exp.company}
                                    onChange={(e) => {
                                      const updatedExp =
                                        resumeData.experience.map((item) =>
                                          item.id === exp.id
                                            ? {
                                                ...item,
                                                company: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        experience: updatedExp,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Location</Label>
                                  <Input
                                    value={exp.location}
                                    onChange={(e) => {
                                      const updatedExp =
                                        resumeData.experience.map((item) =>
                                          item.id === exp.id
                                            ? {
                                                ...item,
                                                location: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        experience: updatedExp,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2 grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input
                                      type="month"
                                      value={exp.startDate}
                                      onChange={(e) => {
                                        const updatedExp =
                                          resumeData.experience.map((item) =>
                                            item.id === exp.id
                                              ? {
                                                  ...item,
                                                  startDate: e.target.value,
                                                }
                                              : item,
                                          );
                                        setResumeData({
                                          ...resumeData,
                                          experience: updatedExp,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Input
                                      type="month"
                                      value={exp.endDate}
                                      placeholder="Present"
                                      onChange={(e) => {
                                        const updatedExp =
                                          resumeData.experience.map((item) =>
                                            item.id === exp.id
                                              ? {
                                                  ...item,
                                                  endDate: e.target.value,
                                                }
                                              : item,
                                          );
                                        setResumeData({
                                          ...resumeData,
                                          experience: updatedExp,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={3}
                                    value={exp.description}
                                    onChange={(e) => {
                                      const updatedExp =
                                        resumeData.experience.map((item) =>
                                          item.id === exp.id
                                            ? {
                                                ...item,
                                                description: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        experience: updatedExp,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                  <Button
                                    onClick={() => setEditingSection(null)}
                                  >
                                    <Save className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm text-muted-foreground">
                                  {exp.company} • {exp.location}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {exp.startDate} - {exp.endDate || "Present"}
                                </p>
                                <p className="text-sm">{exp.description}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2" />
                            Education
                          </CardTitle>
                          <Button
                            size="sm"
                            onClick={() => handleAddItem("education")}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Education
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.education.map((edu) => (
                          <div
                            key={edu.id}
                            className="border rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{edu.degree}</h3>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    setEditingSection(
                                      editingSection === `edu-${edu.id}`
                                        ? null
                                        : `edu-${edu.id}`,
                                    )
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() =>
                                    handleRemoveItem("education", edu.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {editingSection === `edu-${edu.id}` ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Degree</Label>
                                  <Input
                                    value={edu.degree}
                                    onChange={(e) => {
                                      const updatedEdu =
                                        resumeData.education.map((item) =>
                                          item.id === edu.id
                                            ? {
                                                ...item,
                                                degree: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        education: updatedEdu,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Institution</Label>
                                  <Input
                                    value={edu.institution}
                                    onChange={(e) => {
                                      const updatedEdu =
                                        resumeData.education.map((item) =>
                                          item.id === edu.id
                                            ? {
                                                ...item,
                                                institution: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        education: updatedEdu,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Location</Label>
                                  <Input
                                    value={edu.location}
                                    onChange={(e) => {
                                      const updatedEdu =
                                        resumeData.education.map((item) =>
                                          item.id === edu.id
                                            ? {
                                                ...item,
                                                location: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        education: updatedEdu,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2 grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input
                                      type="month"
                                      value={edu.startDate}
                                      onChange={(e) => {
                                        const updatedEdu =
                                          resumeData.education.map((item) =>
                                            item.id === edu.id
                                              ? {
                                                  ...item,
                                                  startDate: e.target.value,
                                                }
                                              : item,
                                          );
                                        setResumeData({
                                          ...resumeData,
                                          education: updatedEdu,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Input
                                      type="month"
                                      value={edu.endDate}
                                      onChange={(e) => {
                                        const updatedEdu =
                                          resumeData.education.map((item) =>
                                            item.id === edu.id
                                              ? {
                                                  ...item,
                                                  endDate: e.target.value,
                                                }
                                              : item,
                                          );
                                        setResumeData({
                                          ...resumeData,
                                          education: updatedEdu,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={3}
                                    value={edu.description}
                                    onChange={(e) => {
                                      const updatedEdu =
                                        resumeData.education.map((item) =>
                                          item.id === edu.id
                                            ? {
                                                ...item,
                                                description: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        education: updatedEdu,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                  <Button
                                    onClick={() => setEditingSection(null)}
                                  >
                                    <Save className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm text-muted-foreground">
                                  {edu.institution} • {edu.location}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {edu.startDate} - {edu.endDate}
                                </p>
                                <p className="text-sm">{edu.description}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <Code className="h-5 w-5 mr-2" />
                            Skills
                          </CardTitle>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generateAIContent("skills")}
                              disabled={isGenerating}
                            >
                              <Sparkles className="h-4 w-4 mr-1 text-primary" />
                              {isGenerating ? "Generating..." : "AI Suggest"}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddItem("skills")}
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add Skill
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center bg-muted rounded-full pl-3 pr-1 py-1"
                            >
                              <span className="text-sm mr-1">{skill.name}</span>
                              <Badge variant="secondary" className="mr-1">
                                {skill.level}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full"
                                onClick={() =>
                                  handleRemoveItem("skills", skill.id)
                                }
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Projects */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <Award className="h-5 w-5 mr-2" />
                            Projects
                          </CardTitle>
                          <Button
                            size="sm"
                            onClick={() => handleAddItem("projects")}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Project
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.projects.map((project) => (
                          <div
                            key={project.id}
                            className="border rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{project.title}</h3>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    setEditingSection(
                                      editingSection === `proj-${project.id}`
                                        ? null
                                        : `proj-${project.id}`,
                                    )
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() =>
                                    handleRemoveItem("projects", project.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {editingSection === `proj-${project.id}` ? (
                              <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                  <Label>Project Title</Label>
                                  <Input
                                    value={project.title}
                                    onChange={(e) => {
                                      const updatedProjects =
                                        resumeData.projects.map((item) =>
                                          item.id === project.id
                                            ? { ...item, title: e.target.value }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        projects: updatedProjects,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={3}
                                    value={project.description}
                                    onChange={(e) => {
                                      const updatedProjects =
                                        resumeData.projects.map((item) =>
                                          item.id === project.id
                                            ? {
                                                ...item,
                                                description: e.target.value,
                                              }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        projects: updatedProjects,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Link</Label>
                                  <Input
                                    value={project.link}
                                    onChange={(e) => {
                                      const updatedProjects =
                                        resumeData.projects.map((item) =>
                                          item.id === project.id
                                            ? { ...item, link: e.target.value }
                                            : item,
                                        );
                                      setResumeData({
                                        ...resumeData,
                                        projects: updatedProjects,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <Button
                                    onClick={() => setEditingSection(null)}
                                  >
                                    <Save className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm">{project.description}</p>
                                {project.link && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline flex items-center"
                                  >
                                    <Link className="h-3.5 w-3.5 mr-1" />
                                    {project.link}
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div
                  className={`max-w-4xl mx-auto border rounded-lg overflow-hidden ${selectedTemplate === "modern" ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900" : selectedTemplate === "minimal" ? "bg-white dark:bg-slate-900" : selectedTemplate === "creative" ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900" : "bg-white dark:bg-slate-900"}`}
                >
                  <div
                    className={`p-8 ${selectedTemplate === "modern" ? "border-b-4 border-blue-500" : selectedTemplate === "creative" ? "border-b-4 border-purple-500" : selectedTemplate === "professional" ? "border-b-4 border-emerald-600" : ""}`}
                  >
                    <h1
                      className={`text-3xl font-bold ${selectedTemplate === "modern" ? "text-blue-700 dark:text-blue-400" : selectedTemplate === "creative" ? "text-purple-700 dark:text-purple-400" : selectedTemplate === "professional" ? "text-emerald-700 dark:text-emerald-400" : ""}`}
                    >
                      {resumeData.personalInfo.name}
                    </h1>
                    <h2 className="text-xl text-muted-foreground mt-1">
                      {resumeData.personalInfo.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                        {resumeData.personalInfo.email}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                        {resumeData.personalInfo.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {resumeData.personalInfo.location}
                      </div>
                    </div>
                    <p className="mt-6 text-sm">
                      {resumeData.personalInfo.summary}
                    </p>
                  </div>

                  <div className="p-8 space-y-6">
                    {/* Experience */}
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${selectedTemplate === "modern" ? "text-blue-700 dark:text-blue-400" : selectedTemplate === "creative" ? "text-purple-700 dark:text-purple-400" : selectedTemplate === "professional" ? "text-emerald-700 dark:text-emerald-400" : ""}`}
                      >
                        <Briefcase className="h-5 w-5 mr-2" />
                        Work Experience
                      </h3>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{exp.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {exp.company} • {exp.location}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {exp.startDate} - {exp.endDate || "Present"}
                              </p>
                            </div>
                            <p className="text-sm mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${selectedTemplate === "modern" ? "text-blue-700 dark:text-blue-400" : selectedTemplate === "creative" ? "text-purple-700 dark:text-purple-400" : selectedTemplate === "professional" ? "text-emerald-700 dark:text-emerald-400" : ""}`}
                      >
                        <GraduationCap className="h-5 w-5 mr-2" />
                        Education
                      </h3>
                      <div className="space-y-4">
                        {resumeData.education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{edu.degree}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {edu.institution} • {edu.location}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {edu.startDate} - {edu.endDate}
                              </p>
                            </div>
                            <p className="text-sm mt-2">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${selectedTemplate === "modern" ? "text-blue-700 dark:text-blue-400" : selectedTemplate === "creative" ? "text-purple-700 dark:text-purple-400" : selectedTemplate === "professional" ? "text-emerald-700 dark:text-emerald-400" : ""}`}
                      >
                        <Code className="h-5 w-5 mr-2" />
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill) => (
                          <Badge
                            key={skill.id}
                            variant={
                              selectedTemplate === "modern"
                                ? "default"
                                : selectedTemplate === "creative"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              selectedTemplate === "modern"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                : selectedTemplate === "creative"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                                  : selectedTemplate === "professional"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
                                    : ""
                            }
                          >
                            {skill.name}{" "}
                            <span className="opacity-70">({skill.level})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${selectedTemplate === "modern" ? "text-blue-700 dark:text-blue-400" : selectedTemplate === "creative" ? "text-purple-700 dark:text-purple-400" : selectedTemplate === "professional" ? "text-emerald-700 dark:text-emerald-400" : ""}`}
                      >
                        <Award className="h-5 w-5 mr-2" />
                        Projects
                      </h3>
                      <div className="space-y-4">
                        {resumeData.projects.map((project) => (
                          <div key={project.id}>
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm mt-1">
                              {project.description}
                            </p>
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm hover:underline flex items-center mt-1 ${selectedTemplate === "modern" ? "text-blue-600 dark:text-blue-400" : selectedTemplate === "creative" ? "text-purple-600 dark:text-purple-400" : selectedTemplate === "professional" ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}
                              >
                                <Link className="h-3.5 w-3.5 mr-1" />
                                {project.link}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Recommendations</CardTitle>
                    <CardDescription>
                      Based on your skills and experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {jobRecommendations.map((job) => (
                      <div
                        key={job.id}
                        className="border rounded-lg p-6 hover:border-primary transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {job.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {job.company}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {job.match}% Match
                          </Badge>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Badge variant="outline">{job.location}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>

                        <p className="mt-4">{job.description}</p>

                        <div className="flex justify-between items-center mt-6">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Save
                            </Button>
                            <Button variant="outline" size="sm">
                              Share
                            </Button>
                          </div>
                          <Button>Apply Now</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Match Analysis</CardTitle>
                    <CardDescription>
                      How your resume matches job requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Skills Match</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Experience Match</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Education Match</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Missing Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Docker</Badge>
                        <Badge variant="outline">AWS</Badge>
                        <Badge variant="outline">GraphQL</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">
                        Improvement Suggestions
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                          <span>
                            Add more quantifiable achievements to your
                            experience
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                          <span>Include relevant certifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                          <span>Highlight team collaboration skills</span>
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Optimize Resume for Jobs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilder;

// Missing import for MapPin
function MapPin(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
