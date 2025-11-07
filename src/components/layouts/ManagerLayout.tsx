// @/components/layout/ManagerLayout.tsx

import { Outlet } from "react-router-dom";
import { Navbar } from "../layout/Navbar"; // <-- Added missing Navbar
import { AppSidebar } from "../layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Kept if external UI library requires it
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

const layoutVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Standardized widths
const EXPANDED_WIDTH = 256; 
const COLLAPSED_WIDTH = 80;

export const ManagerLayout = () => {
  const [hovered, setHovered] = useState(false);
  const currentWidth = hovered ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-card/60 to-background">
        {/* Hover-Expandable Sidebar */}
        <motion.aside
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ width: currentWidth }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed left-0 top-0 z-40 h-screen border-r border-border/50 bg-card/50 backdrop-blur-xl shadow-lg transition-all duration-300"
        >
          {/* Logo/Brand placeholder must be included here, animated with the sidebar */}
          <div className="h-16 flex items-center p-4 border-b border-border/50">
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
              transition={{ delay: hovered ? 0.2 : 0 }}
            >
              GitPulse
            </motion.span>
          </div>
          
          <AppSidebar collapsed={!hovered} />
        </motion.aside>

        {/* Main Content */}
        <div
          className="flex flex-1 flex-col transition-all duration-300"
          style={{ marginLeft: `${currentWidth}px` }} // Dynamic margin
        >
         {/* <-- The crucial addition for Manager UX */}

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