import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface LanguageChartProps {
  languages: string[];
  title?: string;
  description?: string;
}

const COLORS = [
  "hsl(263 70% 50.4%)",
  "hsl(280 70% 50%)",
  "hsl(250 70% 55%)",
  "hsl(270 60% 60%)",
  "hsl(260 65% 52%)",
];

const chartConfig = {
  languages: {
    label: "Languages",
  },
};

export const LanguageChart = ({ 
  languages, 
  title = "Top Languages", 
  description = "Most used programming languages" 
}: LanguageChartProps) => {
  const data = languages.map((lang, index) => ({
    name: lang,
    value: languages.length - index, // Mock values based on order
  }));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur shadow-card">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
