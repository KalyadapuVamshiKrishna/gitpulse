import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  GitBranch, 
  Activity,
  UserCircle 
} from "lucide-react";
import { motion } from "framer-motion";

const managerLinks = [
  { to: "/manager/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/manager/team", label: "Team", icon: Users },
  { to: "/manager/tasks", label: "Tasks", icon: Activity },
  { to: "/manager/analytics", label: "Analytics", icon: GitBranch },
];

const employeeLinks = [
  { to: "/employee/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/employee/repos", label: "Repositories", icon: GitBranch },
  { to: "/employee/activity", label: "Activity", icon: Activity },
  { to: "/employee/tasks", label: "Tasks", icon: UserCircle },
];

interface DashboardSidebarProps {
  role?: 'manager' | 'employee' | null;
}

export const DashboardSidebar = ({ role: propRole }: DashboardSidebarProps = {}) => {
  const { role: authRole } = useSelector((state: RootState) => state.auth);
  const role = propRole || authRole;
  const links = role === "manager" ? managerLinks : employeeLinks;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card/50 backdrop-blur"
    >
      <nav className="flex flex-col gap-1 p-4">
        {links.map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  "hover:bg-accent/50 hover:text-accent-foreground",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground"
                )
              }
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};
