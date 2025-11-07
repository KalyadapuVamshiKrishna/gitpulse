import { Outlet } from "react-router-dom";
import { Navbar } from "../layout/Navbar";
import { AppSidebar } from "../layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, AnimatePresence, Variants } from "framer-motion";

const layoutVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

export const EmployeeLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-card/60 to-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col pl-64">
          <Navbar />

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
