import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { motion } from "framer-motion";
import {
  Sparkles,
  UserPlus,
  Mail,
  Lock,
  User,
  AlertCircle,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [educationField, setEducationField] = useState("Computer Science");
  const [educationLevel, setEducationLevel] = useState("undergraduate");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(email, password, displayName);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse opacity-70" />
              <div className="absolute inset-0.5 rounded-full bg-slate-900 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Create an account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Join EduAI to start your personalized learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-900/20 border-red-800 text-red-300"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education-field" className="text-slate-300">
                Field of Education
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Select
                  value={educationField}
                  onValueChange={setEducationField}
                >
                  <SelectTrigger className="pl-10 bg-slate-800/50 border-slate-700 text-slate-300">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education-level" className="text-slate-300">
                Education Level
              </Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Select
                  value={educationLevel}
                  onValueChange={setEducationLevel}
                >
                  <SelectTrigger className="pl-10 bg-slate-800/50 border-slate-700 text-slate-300">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-300">
                    <SelectItem value="school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign up
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              Sign in
            </Link>
          </div>
          <div className="text-center text-xs text-slate-500">
            By signing up, you agree to our{" "}
            <Link
              to="/terms"
              className="text-slate-400 hover:text-slate-300 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-slate-400 hover:text-slate-300 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RegisterForm;
