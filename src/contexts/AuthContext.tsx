import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "@/store/authSlice";

interface User {
  id: string;
  name: string;
  email: string;
  role: "manager" | "employee" | "user";
}

interface AuthContextType {
  user: User | null;
  userRole: "manager" | "employee" | null;
  loading: boolean;
  signUp: (email: string, password: string, role: "manager" | "employee", name: string) => Promise<{ error?: Error }>;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signInWithGithub: () => Promise<{ error?: Error }>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  updateProfile: (name: string, email?: string) => Promise<{ success: boolean; error?: Error }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: Error }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"manager" | "employee" | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ========================
  // FETCH CURRENT USER
  // ========================
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      if (res.data?.success && res.data.user) {
        const userData = res.data.user;
        setUser(userData);
        setUserRole(userData.role.toLowerCase());
        dispatch(loginSuccess({ role: userData.role.toLowerCase(), username: userData.name }));
      } else {
        setUser(null);
        setUserRole(null);
      }
    } catch {
      setUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ========================
  // SIGN UP
  // ========================
  const signUp = async (email: string, password: string, role: "manager" | "employee", name: string) => {
    try {
      const res = await api.post("/auth/register", { name, email, password, role: role.toUpperCase() });
      if (res.data?.success) return {};
      return { error: new Error(res.data?.message || "Signup failed") };
    } catch (err: any) {
      return { error: new Error(err.response?.data?.message || "Signup failed") };
    }
  };

  // ========================
  // LOGIN
  // ========================
  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data?.success) {
        await fetchUser();
        return {};
      }
      return { error: new Error(res.data?.message || "Login failed") };
    } catch (err: any) {
      return { error: new Error(err.response?.data?.message || "Login failed") };
    }
  };

  // ========================
  // GITHUB LOGIN
  // ========================
  const signInWithGithub = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/github/redirect`;
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  // ========================
  // LOGOUT
  // ========================
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setUserRole(null);
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // ========================
  // UPDATE PROFILE
  // ========================
  const updateProfile = async (name: string, email?: string) => {
    try {
      const res = await api.put("/auth/update-profile", { name, email });
      if (res.data?.success) {
        await fetchUser();
        return { success: true };
      }
      return { success: false, error: new Error(res.data?.message || "Profile update failed") };
    } catch (err: any) {
      return { success: false, error: new Error(err.response?.data?.message || "Profile update failed") };
    }
  };

  // ========================
  // UPDATE PASSWORD
  // ========================
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const res = await api.put("/auth/update-password", { currentPassword, newPassword });
      if (res.data?.success) {
        return { success: true };
      }
      return { success: false, error: new Error(res.data?.message || "Password update failed") };
    } catch (err: any) {
      return { success: false, error: new Error(err.response?.data?.message || "Password update failed") };
    }
  };

  // ========================
  // CONTEXT VALUE
  // ========================
  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        signUp,
        signIn,
        signInWithGithub,
        logout,
        fetchUser,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
