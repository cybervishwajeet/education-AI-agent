import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({
  icon,
  label,
  path,
  active = false,
  collapsed = false,
}: NavItemProps) => {
  const navItemClasses = cn(
    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full",
    active
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  );

  return collapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-10 h-10",
              active && "bg-primary text-primary-foreground",
            )}
            asChild
          >
            <Link to={path}>{icon}</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button variant="ghost" className={navItemClasses} asChild>
      <Link to={path}>
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
};

interface SidebarProps {
  defaultCollapsed?: boolean;
}

const Sidebar = ({ defaultCollapsed = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <BookOpen size={20} />,
      label: "Learning Path",
      path: "/learning-path",
    },
    {
      icon: <BrainCircuit size={20} />,
      label: "AI Chatbot",
      path: "/chatbot",
    },
    {
      icon: <GraduationCap size={20} />,
      label: "Quiz & Assessments",
      path: "/quiz",
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-background border-r flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && <div className="font-bold text-xl">EduAI Platform</div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 py-6 px-2 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={currentPath === item.path}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 text-muted-foreground hover:text-red-500",
            collapsed && "justify-center",
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
