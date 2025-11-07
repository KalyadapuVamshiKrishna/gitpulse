import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp } from "@/lib/motion";
import { api } from "@/lib/api";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"manager" | "employee">("employee");
  const [loading, setLoading] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // ===================================
  // Step 1: Extract token from URL
  // ===================================
  useEffect(() => {
    const tempToken = searchParams.get("token");
    if (!tempToken) {
      toast({
        title: "Invalid access",
        description: "Missing GitHub authorization token",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }
    setToken(tempToken);

    // Decode basic info (for username display)
    try {
      const base64Payload = tempToken.split(".")[1];
      const decoded = JSON.parse(atob(base64Payload));
      setGithubUsername(decoded.githubLogin || decoded.name || "GitHub User");
    } catch {
      setGithubUsername("GitHub User");
    }
  }, [searchParams, toast, navigate]);

  // ===================================
  // Step 2: Handle profile completion
  // ===================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: "Missing token",
        description: "Please restart the GitHub signup process.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/complete-signup", {
        token,
        password,
        role,
      });

      if (res.data?.success) {
        toast({
          title: "Profile completed!",
          description: "Welcome to GitPulse",
        });

        const redirectPath =
          res.data.role === "manager"
            ? "/manager/dashboard"
            : "/employee/dashboard";
        navigate(redirectPath, { replace: true });
      } else {
        throw new Error(res.data?.message || "Signup failed");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err.response?.data?.message ||
          err.message ||
          "Failed to complete profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ===================================
  // Step 3: UI
  // ===================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="w-full max-w-md"
      >
        {/* ---------- HEADER ---------- */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-500 mb-4"
          >
            <GitBranch className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Finalize your GitPulse account setup
          </p>
        </div>

        {/* ---------- CARD ---------- */}
        <Card className="border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle>Almost there!</CardTitle>
            <CardDescription>
              Signed in as{" "}
              <span className="font-semibold text-foreground">
                {githubUsername}
              </span>
              . Create a local password and choose your role.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select
                  value={role}
                  onValueChange={(value: "manager" | "employee") =>
                    setRole(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Create Local Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This lets you log in using email/password later
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Completing..." : "Complete Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
