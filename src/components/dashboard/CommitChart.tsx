import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CommitDataPoint {
  date: string;
  commits: number;
}

interface CommitChartProps {
  data: CommitDataPoint[];
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Modern, Glassmorphic Commit Chart
 * Works seamlessly with backend analytics or mock data
 * Automatically formats date labels and commits
 */
export const CommitChart = ({
  data,
  title = "Commit Activity",
  description = "GitHub commits overview",
  className,
}: CommitChartProps) => {
  // Format dates for X-axis (short month + day)
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
              <CardDescription className="text-muted-foreground">{description}</CardDescription>
            </div>
            <div className="w-3 h-3 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(var(--primary))]" />
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={{
              commits: {
                label: "Commits",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.25}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickMargin={8}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltipContent />} cursor={{ stroke: "hsl(var(--border))" }} />

                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "hsl(var(--primary))",
                    fill: "white",
                    strokeWidth: 2,
                    className: "animate-pulse",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
