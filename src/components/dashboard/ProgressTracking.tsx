import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Activity, BookOpen, Award } from "lucide-react";

interface ProgressTrackingProps {
  courseProgress?: number;
  quizCompletion?: number;
  resourcesAccessed?: number;
  certificatesEarned?: number;
  weeklyGoalProgress?: number;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({
  courseProgress = 65,
  quizCompletion = 42,
  resourcesAccessed = 78,
  certificatesEarned = 2,
  weeklyGoalProgress = 85,
}) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Learning Progress</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4" />
          <span>Last updated: Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Course Completion
            </CardTitle>
            <CardDescription>
              Overall progress in your learning path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {courseProgress}% Complete
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(courseProgress / 10)} of 10 modules
                </span>
              </div>
              <Progress value={courseProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Quiz Performance
            </CardTitle>
            <CardDescription>Your assessment completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {quizCompletion}% Success Rate
                </span>
                <span className="text-sm text-muted-foreground">
                  8 of 19 quizzes
                </span>
              </div>
              <Progress value={quizCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">{resourcesAccessed}</div>
              <p className="text-sm text-muted-foreground">
                Learning materials accessed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">{certificatesEarned}</div>
              <p className="text-sm text-muted-foreground">
                Certificates earned
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {weeklyGoalProgress}%
                </span>
                <span className="text-sm text-muted-foreground">
                  5.1 of 6 hours
                </span>
              </div>
              <Progress value={weeklyGoalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking;
