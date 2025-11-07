import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageDataPoint {
  name: string;
  value: number;
}

interface LanguageChartProps {
  languages: LanguageDataPoint[];
  title?: string;
  description?: string;
  className?: string;
}

// Futuristic color palette
const COLORS = [
  "hsl(263 70% 50.4%)",
  "hsl(280 70% 50%)",
  "hsl(250 70% 55%)",
  "hsl(270 60% 60%)",
  "hsl(260 65% 52%)",
];

export const LanguageChart = ({
  languages,
  title = "Top Languages",
  description = "Most used programming languages",
  className,
}: LanguageChartProps) => {
  // Ensure valid numeric data
  const chartData = languages.map((lang, index) => ({
    name: lang.name,
    value: Number(lang.value) || 0,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
              <CardDescription className="text-muted-foreground">{description}</CardDescription>
            </div>
            <div className="w-3 h-3 rounded-full bg-purple-500/70 shadow-[0_0_8px_hsl(263_70%_50%)]" />
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={{
              languages: { label: "Languages" },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(Number(percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
