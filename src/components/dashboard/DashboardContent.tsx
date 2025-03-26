import React from "react";
import RecommendedContent from "./RecommendedContent";
import ProgressTracking from "./ProgressTracking";
import TrendingNews from "./TrendingNews";

interface DashboardContentProps {
  userName?: string;
  educationField?: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  userName = "Student",
  educationField = "Computer Science",
}) => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground mt-1">
          Your personalized learning dashboard for {educationField}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left and Center Column (spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Tracking Section */}
          <section aria-labelledby="progress-section">
            <h2 id="progress-section" className="sr-only">
              Your Learning Progress
            </h2>
            <ProgressTracking
              courseProgress={65}
              quizCompletion={42}
              resourcesAccessed={78}
              certificatesEarned={2}
              weeklyGoalProgress={85}
            />
          </section>

          {/* Recommended Content Section */}
          <section aria-labelledby="recommended-section">
            <h2 id="recommended-section" className="sr-only">
              Recommended Learning Resources
            </h2>
            <RecommendedContent
              title={`Recommended for ${educationField}`}
              description="AI-curated content based on your learning preferences and education field"
            />
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Trending News Section */}
          <section aria-labelledby="trending-section">
            <h2 id="trending-section" className="sr-only">
              Trending in Technology
            </h2>
            <TrendingNews title={`Trending in ${educationField}`} />
          </section>

          {/* Quick Actions Card */}
          <section aria-labelledby="quick-actions">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 id="quick-actions" className="text-xl font-bold mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                  Start New Quiz
                </button>
                <button className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors">
                  View Learning Path
                </button>
                <button className="p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors">
                  Chat with AI Tutor
                </button>
                <button className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-medium transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </section>

          {/* Study Reminder Card */}
          <section aria-labelledby="study-reminder">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg text-white">
              <h2 id="study-reminder" className="text-xl font-bold mb-2">
                Daily Study Reminder
              </h2>
              <p className="mb-4 opacity-90">
                You're on a 5-day learning streak! Continue your progress today.
              </p>
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-medium mb-1">Today's Goal</h3>
                <p className="text-sm mb-3">
                  Complete Module 3: Data Structures in Python
                </p>
                <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-right">35% Complete</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
