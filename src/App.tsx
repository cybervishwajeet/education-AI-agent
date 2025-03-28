import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/auth/AuthProvider";
import { AuthProvider } from "./components/auth/AuthProvider";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load components
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegisterForm = lazy(() => import("./components/auth/RegisterForm"));
const RoadmapExplorer = lazy(
  () => import("./components/learning/RoadmapExplorer"),
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmaps"
          element={
            <ProtectedRoute>
              <RoadmapExplorer />
            </ProtectedRoute>
          }
        />
        {/* Add tempo routes for storyboards */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

function App() {
  // Apply dark mode class to document element
  document.documentElement.classList.add("dark");

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
