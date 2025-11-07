import { useLocation, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Activity,
  UserCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";

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

export function AppSidebar() {
  const { userRole } = useAuth();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = userRole === "manager" ? managerLinks : employeeLinks;
  const currentPath = location.pathname;

  const SidebarContentInner = (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Main Menu
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {links.map((item, index) => {
              const isActive = currentPath === item.url;
              return (
                <motion.div
                  key={item.url}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onClick={() => setDrawerOpen(false)} // Close drawer on mobile
                        className={({ isActive }) =>
                          cn(
                            "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                            "hover:bg-accent/50",
                            isActive
                              ? "bg-primary/10 text-primary shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          )
                        }
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/profile"
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      "hover:bg-accent/50",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <Settings className="h-5 w-5 shrink-0" />
                  <span>Settings</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );

  if (isDesktop) {
    return (
      <Sidebar className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card/80 backdrop-blur-xl">
        {SidebarContentInner}
      </Sidebar>
    );
  }

  // Mobile Drawer Sidebar
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 bg-card/80 backdrop-blur border"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <div className="bg-card border-t rounded-t-lg">
          {SidebarContentInner}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
