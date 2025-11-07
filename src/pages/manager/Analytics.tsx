import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAnalyticsData } from "@/store/analyticsSlice";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CommitChart } from "@/components/dashboard/CommitChart";
import { LanguageChart } from "@/components/dashboard/LanguageChart";
import { GitCommit, GitBranch, Star, GitPullRequest } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const Layout: any = ManagerLayout;

export default function Analytics() {
  const dispatch = useDispatch();
  const { data: analytics, loading } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    // 🔹 Replace mockAnalytics with a real API call later:
    // const res = await api.get("/analytics");
    // dispatch(setAnalyticsData(res.data));
    import("@/data/mockAnalytics").then(({ mockAnalytics }) =>
      dispatch(setAnalyticsData(mockAnalytics))
    );
  }, [dispatch]);

  if (loading || !analytics) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-muted-foreground">Loading analytics...</div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <AnimatePresence mode="wait">
    <ManagerLayout>
      <AnimatePresence mode="wait">
        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* ======================= Header ======================= */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Team Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Deep insights into your team’s performance and code activity.
            </p>
          </motion.div>

          {/* ======================= Stat Cards ======================= */}
          <motion.div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
              "relative z-10"
            )}
            variants={staggerContainer}
          >
            <StatCard
              title="Total Commits"
              value={analytics.totalCommits}
              icon={GitCommit}
              description="Last 30 days"
              trend="+12% from last month"
              index={0}
            />
            <StatCard
              title="Repositories"
              value={analytics.totalRepos}
              icon={GitBranch}
              description="Active projects"
              trend="+3 this month"
              index={1}
            />
            <StatCard
              title="Stars"
              value={analytics.totalStars}
              icon={Star}
              description="Total across all repos"
              trend="+8 this week"
              index={2}
            />
            <StatCard
              title="Pull Requests"
              value={analytics.totalPRs}
              icon={GitPullRequest}
              description="Merged this month"
              trend="+15% from last month"
              index={3}
            />
          </motion.div>

          {/* ======================= Charts Section ======================= */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="lg:col-span-2">
              <CommitChart
                data={analytics.commitTrend}
                title="Commit Activity"
                description="Team commit trends over the last 14 days"
              />
            </div>

            <div>
              <LanguageChart
                languages={analytics.languageDistribution}
                title="Language Distribution"
                description="Top languages used across repositories"
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ManagerLayout>
      </AnimatePresence>
    </Layout>
  );
}
