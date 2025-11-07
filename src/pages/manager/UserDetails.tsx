import { useParams, useNavigate } from "react-router-dom";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CommitChart } from "@/components/dashboard/CommitChart";
import { LanguageChart } from "@/components/dashboard/LanguageChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getEmployeeById } from "@/data/mockData";
import { GitBranch, Star, FolderGit2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = getEmployeeById(Number(id));

  if (!employee) {
    toast.error("Employee not found");
    navigate("/manager/team");
    return null;
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/manager/team")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team
        </Button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={employee.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-1">{employee.name}</h1>
                  <p className="text-muted-foreground mb-2">@{employee.username}</p>
                  <p className="text-sm text-foreground/80">{employee.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatCard
            title="Total Commits"
            value={employee.commits}
            icon={GitBranch}
            description="All-time contributions"
            index={0}
          />
          <StatCard
            title="Repositories"
            value={employee.repos}
            icon={FolderGit2}
            description="Active projects"
            index={1}
          />
          <StatCard
            title="Stars Earned"
            value={employee.stars}
            icon={Star}
            description="Community appreciation"
            index={2}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CommitChart 
            data={employee.activity}
            title="Commit Activity"
            description="Last 7 days"
          />
          <LanguageChart 
            languages={employee.languages}
            title="Programming Languages"
            description="Most frequently used"
          />
        </div>
      </div>
    </ManagerLayout>
  );
}
