import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTasks } from '@/store/tasksSlice';
import { mockTasks } from '@/data/mockTasks';
import { EmployeeLayout } from '@/components/layouts/EmployeeLayout';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';
import { Clock, Tag } from 'lucide-react';

const priorityColors = {
  low: 'bg-slate-500/20 text-slate-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-amber-500/20 text-amber-400',
  urgent: 'bg-red-500/20 text-red-400',
};

export default function Tasks() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { username } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setTasks(mockTasks));
  }, [dispatch]);

  // Filter tasks assigned to current user
  const myTasks = tasks.filter(task => 
    task.assignedTo.toLowerCase().includes('vamshi') || task.assignedToId === 1
  );

  const pendingTasks = myTasks.filter(t => t.status !== 'done');
  const completedTasks = myTasks.filter(t => t.status === 'done');

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground mt-2">
            {pendingTasks.length} pending, {completedTasks.length} completed
          </p>
        </div>

        <motion.div 
          className="space-y-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {pendingTasks.length > 0 && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-semibold text-foreground mb-3">Pending Tasks</h2>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <GlassmorphismCard key={task.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox className="mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground">{task.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          </div>
                          <Badge className={priorityColors[task.priority]} variant="outline">
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>

                        {task.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            {task.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassmorphismCard>
                ))}
              </div>
            </motion.div>
          )}

          {completedTasks.length > 0 && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-semibold text-foreground mb-3">Completed Tasks</h2>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <GlassmorphismCard key={task.id} className="p-4 opacity-60">
                    <div className="flex items-start gap-4">
                      <Checkbox checked className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground line-through">{task.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30" variant="outline">
                            Done
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </GlassmorphismCard>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </EmployeeLayout>
  );
}
