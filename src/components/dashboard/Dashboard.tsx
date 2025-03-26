import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import { motion } from "framer-motion";

interface DashboardProps {
  userName?: string;
  educationField?: string;
  isCollapsed?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  userName = "User",
  educationField = "Computer Science",
  isCollapsed = false,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isCollapsed);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-full bg-background dark:bg-slate-900">
      <Sidebar
        userName={userName}
        educationField={educationField}
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <motion.div
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <DashboardContent userName={userName} educationField={educationField} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
