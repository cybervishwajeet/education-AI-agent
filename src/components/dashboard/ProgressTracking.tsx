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
    <div className="w-full bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Activity className="h-4 w-4" />
          <span>Last updated: Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <BarChart className="h-5 w-5 text-blue-400" />
              Course Completion
            </CardTitle>
            <CardDescription className="text-slate-400">
              Overall progress in your learning path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-white">
                  {courseProgress}% Complete
                </span>
                <span className="text-sm text-slate-400">
                  {Math.round(courseProgress / 10)} of 10 modules
                </span>
              </div>
              <Progress value={courseProgress} className="h-2 bg-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-purple-400" />
              Quiz Performance
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your assessment completion rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-white">
                  {quizCompletion}% Success Rate
                </span>
                <span className="text-sm text-slate-400">8 of 19 quizzes</span>
              </div>
              <Progress value={quizCompletion} className="h-2 bg-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5 text-green-400" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-white">
                {resourcesAccessed}
              </div>
              <p className="text-sm text-slate-400">
                Learning materials accessed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-yellow-400" />
              Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-white">
                {certificatesEarned}
              </div>
              <p className="text-sm text-slate-400">Certificates earned</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-blue-400" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-white">
                  {weeklyGoalProgress}%
                </span>
                <span className="text-sm text-slate-400">5.1 of 6 hours</span>
              </div>
              <Progress
                value={weeklyGoalProgress}
                className="h-2 bg-slate-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking;
