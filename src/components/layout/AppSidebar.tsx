// @/components/layout/AppSidebar.tsx (Fixed for clean sweep animation)

import { useLocation, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    Users,
    GitBranch,
    Activity,
    Settings,
    UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, type Transition } from "framer-motion";

// --- Link Definitions (Centralized) ---

const managerLinks = [
    { title: "Overview", url: "/manager/dashboard", icon: LayoutDashboard },
    { title: "Team", url: "/manager/team", icon: Users },
    { title: "Tasks", url: "/manager/tasks", icon: Activity },
    { title: "Analytics", url: "/manager/analytics", icon: GitBranch },
];

const employeeLinks = [
    { title: "Overview", url: "/employee/dashboard", icon: LayoutDashboard },
    { title: "Repositories", url: "/employee/repos", icon: GitBranch },
    { title: "Activity", url: "/employee/activity", icon: Activity },
    { title: "Tasks", url: "/employee/tasks", icon: UserCircle },
];

interface AppSidebarProps {
    collapsed: boolean;
}

/**
 * Render the application's vertical sidebar with role-based navigation and collapse animations.
 *
 * @param collapsed - Whether the sidebar is collapsed; when true link labels are hidden and icons are centered.
 * @returns The sidebar element containing role-specific navigation links, an animated collapse/sweep for link labels, and an active-route indicator.
 */
export function AppSidebar({ collapsed }: AppSidebarProps) {
    const { userRole } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    const links = userRole === "manager" ? managerLinks : employeeLinks;

    // Modern Link Styles
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        cn(
            "relative flex items-center h-10 overflow-hidden text-ellipsis rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
            "hover:bg-accent/40",
            isActive
                ? "bg-primary/10 text-primary font-semibold shadow-inner shadow-primary/5"
                : "text-muted-foreground hover:text-foreground"
        );

    // Use a spring transition for smooth movement
    const transition: Transition = { type: "spring", stiffness: 400, damping: 30 };

    return (
        <div className="flex flex-col h-full space-y-4 p-4">
            {/* Main Menu Group */}
            <div className="flex flex-col space-y-1">
                {!collapsed && (
                    <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2 pt-4">
                       
                    </h3>
                )}

                {links.map((item, index) => {
                    // Only animate the link element itself for position/opacity if needed
                    return (
                        <motion.div key={item.url}>
                            <NavLink to={item.url} className={linkClass}>
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 shrink-0 transition-transform duration-300",
                                        collapsed ? "mx-auto" : "mr-3"
                                    )}
                                />
                                
                                {/* Animate the text's position and opacity for the sweep effect */}
                                <motion.span
                                    className="whitespace-nowrap"
                                    initial={false}
                                    animate={{ 
                                        opacity: collapsed ? 0 : 1,
                                        x: collapsed ? -10 : 0, // Simple left-to-right sweep
                                        width: collapsed ? 0 : 'auto',
                                    }}
                                    transition={transition}
                                >
                                    {item.title}
                                </motion.span>

                                {/* Fixed Active Indicator (without layoutId) */}
                                {currentPath === item.url && (
                                    <motion.div
                                        // Removed layoutId to prevent content re-arrangement.
                                        className="absolute inset-y-1 right-0 w-1 bg-primary/80 rounded-l-md shadow-lg shadow-primary/30"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </NavLink>
                        </motion.div>
                    );
                })}
            </div>

            {/* Settings/Profile Group (Pushed to Bottom) */}
            <div className="mt-auto pt-4 border-t border-border/50">
                <NavLink to="/profile" className={linkClass}>
                    <Settings
                        className={cn(
                            "h-5 w-5 shrink-0 transition-transform duration-300",
                            collapsed ? "mx-auto" : "mr-3"
                        )}
                    />
                    <motion.span
                        className="whitespace-nowrap"
                        initial={false}
                        animate={{ 
                            opacity: collapsed ? 0 : 1,
                            x: collapsed ? -10 : 0, // Simple left-to-right sweep
                        }}
                        transition={transition}
                    >
                        Settings
                    </motion.span>
                </NavLink>
            </div>
        </div>
    );
}

// ----------------------------------------------------
// NOTE: The redundant DashboardSidebar component below 
// should be DELETED from your file system.
// ----------------------------------------------------
/* import { NavLink } from "react-router-dom";
// ... (rest of old DashboardSidebar component)
*/
// ----------------------------------------------------