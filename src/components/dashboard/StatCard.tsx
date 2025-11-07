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
  className,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 group",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p className="mt-2 text-xs font-medium text-primary/90">{trend}</p>
          )}
        </CardContent>

        {/* Bottom animated gradient bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/60 via-purple-500/60 to-primary/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          style={{ transformOrigin: "left" }}
        />
      </Card>
    </motion.div>
  );
};
