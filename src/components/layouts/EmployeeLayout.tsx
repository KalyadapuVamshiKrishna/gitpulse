// @/components/layout/EmployeeLayout.tsx

import { Outlet } from "react-router-dom";
import { Navbar } from "../layout/Navbar";
import { AppSidebar } from "../layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Kept if external UI library requires it
import { motion, AnimatePresence, Variants } from "framer-motion";

const layoutVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Define the standard, fixed width for the Employee Sidebar
const EMPLOYEE_SIDEBAR_WIDTH = 256; 

export const EmployeeLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-card/60 to-background">
        {/* Fixed Sidebar */}
        <div 
          className="fixed left-0 top-0 z-40 h-screen w-[256px] border-r border-border/50 bg-card/50 backdrop-blur-xl shadow-lg"
        >
          {/* Logo/Brand placeholder must be included here */}
          <div className="h-16 flex items-center p-4 border-b border-border/50">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              GitPulse
            </span>
          </div>
          <AppSidebar collapsed={false} /> {/* Employee sidebar is always open */}
        </div>

        {/* Main Content */}
        <div 
          className="flex flex-1 flex-col transition-all duration-300"
          style={{ marginLeft: `${EMPLOYEE_SIDEBAR_WIDTH}px` }} // Dynamic margin
        >
          

          <motion.main
            className="flex-1 overflow-y-auto p-6 md:p-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={layoutVariants}
          >
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
};