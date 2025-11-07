import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  index?: number;
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  index = 0,
  className 
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={cn(
        "relative overflow-hidden border-border/50 bg-card/50 backdrop-blur shadow-card transition-all hover:shadow-lg hover:shadow-primary/5",
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          )}
          {trend && (
            <p className="mt-2 text-xs text-primary font-medium">
              {trend}
            </p>
          )}
        </CardContent>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-purple-500/50" />
      </Card>
    </motion.div>
  );
};
