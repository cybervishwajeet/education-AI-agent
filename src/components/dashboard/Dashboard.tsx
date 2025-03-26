import React from "react";
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
}) => {
  return (
    <div className="h-full bg-slate-900">
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
