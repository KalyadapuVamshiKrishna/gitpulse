import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTeamMembers } from "@/store/teamSlice";
import { setAnalyticsData } from "@/store/analyticsSlice";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CommitChart } from "@/components/dashboard/CommitChart";
import { LanguageChart } from "@/components/dashboard/LanguageChart";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Users, Star, GitPullRequest } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { members: team } = useSelector((state: RootState) => state.team);
  const { data: analytics } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [teamRes, analyticsRes] = await Promise.all([
          api.get("/manager/team"),
          api.get("/manager/analytics"),
        ]);

        if (teamRes.data?.success) {
          const formattedTeam = teamRes.data.team.map((emp: any) => ({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            role: emp.role || "employee",
            avatar: emp.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.email}`,
            commits: emp.totalCommits || 0,
            repos: emp.totalRepos || 0,
            stars: emp.totalStars || 0,
            joinedDate: emp.createdAt,
            status: emp.active ? "active" : "inactive",
          }));
          dispatch(setTeamMembers(formattedTeam));
        }

        if (analyticsRes.data?.success) {
          dispatch(setAnalyticsData(analyticsRes.data.analytics));
        }
      } catch (error: any) {
        console.error("Failed to load dashboard data:", error);
        toast.error(error.response?.data?.message || "Error fetching dashboard data");
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  const stats = {
    totalCommits: team.reduce((sum, member) => sum + (member.commits || 0), 0),
    teamSize: team.length,
    totalRepos: team.reduce((sum, member) => sum + (member.repos || 0), 0),
    totalStars: team.reduce((sum, member) => sum + (member.stars || 0), 0),
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Overview</h1>
          <p className="text-muted-foreground mt-2">Monitor your team's GitHub performance</p>
        </div>

        {/* Top Stats */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <StatCard
            title="Total Commits"
            value={analytics?.totalCommits || stats.totalCommits}
            icon={GitBranch}
            description="Across all repositories"
            trend="+12% from last week"
            index={0}
          />
          <StatCard
            title="Team Members"
            value={stats.teamSize}
            icon={Users}
            description="Active contributors"
            index={1}
          />
          <StatCard
            title="Repositories"
            value={analytics?.totalRepos || stats.totalRepos}
            icon={GitPullRequest}
            description="Total projects"
            trend="+3 new this month"
            index={2}
          />
          <StatCard
            title="Total Stars"
            value={analytics?.totalStars || stats.totalStars}
            icon={Star}
            description="Community appreciation"
            trend="+8 this week"
            index={3}
          />
        </motion.div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {analytics && (
            <>
              <motion.div variants={fadeInUp}>
                <CommitChart
                  data={analytics.commitTrend || []}
                  title="Team Commit Activity"
                  description="Combined commits from all team members"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <LanguageChart
                  languages={analytics.languageDistribution?.map((l: any) => l.name) || []}
                  title="Team Languages"
                  description="Most used across all projects"
                />
              </motion.div>
            </>
          )}
        </div>

        {/* Team Section */}
        <motion.div variants={fadeInUp}>
          <GlassmorphismCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
              <Badge variant="secondary">{team.length} members</Badge>
            </div>

            {team.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">
                No team members found. Invite members to start tracking their GitHub performance.
              </p>
            ) : (
              <div className="space-y-4">
                {team.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card/30 cursor-pointer transition-colors hover:bg-card/50"
                    onClick={() => navigate(`/manager/user/${member.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{member.commits}</p>
                        <p className="text-muted-foreground">Commits</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{member.repos}</p>
                        <p className="text-muted-foreground">Repos</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{member.stars}</p>
                        <p className="text-muted-foreground">Stars</p>
                      </div>
                      <Badge
                        className={
                          member.status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-muted text-muted-foreground"
                        }
                        variant="outline"
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassmorphismCard>
        </motion.div>
      </div>
    </ManagerLayout>
  );
}
