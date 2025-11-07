import { EmployeeLayout } from "@/components/layouts/EmployeeLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRepositories } from "@/data/mockData";
import { Star, GitFork, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Repositories() {
  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">My Repositories</h1>
          <p className="text-muted-foreground">Browse and manage your GitHub projects</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockRepositories.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-card hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {repo.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {repo.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 ml-2">
                      {repo.language}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Clock className="h-4 w-4" />
                      <span>Updated {new Date(repo.lastUpdated).toLocaleDateString()}</span>
                    </div>
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
