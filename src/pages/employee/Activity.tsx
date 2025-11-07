import { EmployeeLayout } from "@/components/layouts/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockEmployee } from "@/data/mockData";
import { GitCommit, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Activity() {
  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Activity Timeline</h1>
          <p className="text-muted-foreground">Your recent GitHub contributions</p>
        </motion.div>

        <div className="space-y-4">
          {mockEmployee.activity.slice().reverse().map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-card hover:shadow-lg hover:shadow-primary/5 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </CardTitle>
                        <CardDescription>
                          {day.commits} {day.commits === 1 ? 'commit' : 'commits'} made
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                      <GitCommit className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">{day.commits}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.commits / 15) * 100}%` }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="h-full gradient-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}
