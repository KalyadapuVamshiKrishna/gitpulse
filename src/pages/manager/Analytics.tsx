import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setAnalyticsData } from '@/store/analyticsSlice';
import { mockAnalytics } from '@/data/mockAnalytics';
import { ManagerLayout } from '@/components/layouts/ManagerLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CommitChart } from '@/components/dashboard/CommitChart';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { GitCommit, GitBranch, Star, GitPullRequest } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

export default function Analytics() {
  const dispatch = useDispatch();
  const { data: analytics } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(setAnalyticsData(mockAnalytics));
  }, [dispatch]);

  if (!analytics) {
    return (
      <ManagerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-muted-foreground">Loading analytics...</div>
        </div>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Analytics</h1>
          <p className="text-muted-foreground mt-2">Deep insights into team performance</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <CommitChart
              data={analytics.commitTrend}
              title="Commit Activity"
              description="Team commit trends over the last 14 days"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <LanguageChart
              languages={analytics.languageDistribution.map(l => l.name)}
              title="Language Distribution"
              description="Primary languages used across repositories"
            />
          </motion.div>
        </div>
      </div>
    </ManagerLayout>
  );
}
