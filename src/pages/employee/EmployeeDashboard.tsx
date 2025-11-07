import { EmployeeLayout } from '@/components/layouts/EmployeeLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CommitChart } from '@/components/dashboard/CommitChart';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { mockEmployee } from '@/data/mockData';
import { GitBranch, Star, FolderGit2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

export default function EmployeeDashboard() {
  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {mockEmployee.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">Here's your GitHub activity overview</p>
        </div>

        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <StatCard
            title="Total Commits"
            value={mockEmployee.commits}
            icon={GitBranch}
            description="All-time contributions"
            trend="+15 this week"
            index={0}
          />
          <StatCard
            title="Repositories"
            value={mockEmployee.repos}
            icon={FolderGit2}
            description="Active projects"
            index={1}
          />
          <StatCard
            title="Stars Earned"
            value={mockEmployee.stars}
            icon={Star}
            description="Community appreciation"
            trend="+3 this month"
            index={2}
          />
          <StatCard
            title="Avg. Commits/Day"
            value="11"
            icon={TrendingUp}
            description="Last 7 days"
            trend="Above average!"
            index={3}
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={fadeInUp}>
            <CommitChart 
              data={mockEmployee.activity}
              title="My Commit Activity"
              description="Your daily contributions over the past week"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <LanguageChart 
              languages={mockEmployee.languages}
              title="My Languages"
              description="Languages you've used in your projects"
            />
          </motion.div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
