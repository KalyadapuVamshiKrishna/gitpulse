import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

import Login from "./pages/Login";
import CompleteProfile from "./pages/CompleteProfile";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import TeamAnalytics from "./pages/manager/TeamAnalytics";
import UserDetails from "./pages/manager/UserDetails";
import ManagerTasks from "./pages/manager/Tasks";
import ManagerAnalytics from "./pages/manager/Analytics";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Repositories from "./pages/employee/Repositories";
import Activity from "./pages/employee/Activity";
import EmployeeTasks from "./pages/employee/Tasks";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// ProtectedRoute component removed - no routing protection for now

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/" element={<Login />} />
        
        {/* Manager Routes */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/team" element={<TeamAnalytics />} />
        <Route path="/manager/user/:id" element={<UserDetails />} />
        <Route path="/manager/tasks" element={<ManagerTasks />} />
        <Route path="/manager/analytics" element={<ManagerAnalytics />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Employee Routes */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/repos" element={<Repositories />} />
        <Route path="/employee/activity" element={<Activity />} />
        <Route path="/employee/tasks" element={<EmployeeTasks />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
