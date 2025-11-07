import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { UserCircle, Github, Lock, Mail } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Profile() {
  const { user, updateProfile, updatePassword, fetchUser } = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user info from backend (via AuthContext)
  useEffect(() => {
    if (user) {
      setDisplayName(user.name || "");
      setGithubUsername(user.githubLogin || null);
    }
  }, [user]);

  // ========================
  // HANDLE PROFILE UPDATE
  // ========================
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast({
        title: "Invalid name",
        description: "Display name cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const res = await updateProfile(displayName);
    setLoading(false);

    if (res.success) {
      await fetchUser();
      toast({
        title: "Profile updated",
        description: "Your display name was updated successfully.",
      });
    } else {
      toast({
        title: "Error updating profile",
        description: res.error?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // ========================
  // HANDLE PASSWORD UPDATE
  // ========================
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const res = await updatePassword("", newPassword); // currentPassword not required if using JWT auth
    setLoading(false);

    if (res.success) {
      setNewPassword("");
      setConfirmPassword("");
      toast({
        title: "Password updated",
        description: "Your password was changed successfully.",
      });
    } else {
      toast({
        title: "Error updating password",
        description: res.error?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-4xl space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </motion.div>

        {/* Profile Info */}
        <motion.div variants={fadeInUp}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <UserCircle className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your display name</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" disabled={loading} className="gradient-primary">
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* GitHub Info */}
        <motion.div variants={fadeInUp}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Github className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>GitHub Connection</CardTitle>
                  <CardDescription>Your connected GitHub account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {githubUsername ? (
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-sm">
                    <Github className="h-3 w-3 mr-1" />
                    {githubUsername}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Connected</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No GitHub account connected
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Password Change */}
        <motion.div variants={fadeInUp}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" disabled={loading} className="gradient-primary">
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
