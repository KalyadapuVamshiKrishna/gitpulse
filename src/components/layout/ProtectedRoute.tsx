import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * ProtectedRoute Component
 *
 * - Checks for authentication and role access.
 * - Redirects unauthenticated users to /login.
 * - Supports role-based access control (RBAC).
 * - Displays a loading spinner during auth initialization.
 */

interface ProtectedRouteProps {
  allowedRoles?: ("manager" | "employee")[]; // Optional role restriction
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  // Still checking auth
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p>Authenticating...</p>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role restriction exists, enforce it
  if (allowedRoles && !allowedRoles.includes(userRole as "manager" | "employee")) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render nested routes (React Router v6 Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
