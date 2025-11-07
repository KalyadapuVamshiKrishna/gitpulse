import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTasks } from '@/store/tasksSlice';
import { mockTasks } from '@/data/mockTasks';
import { ManagerLayout } from '@/components/layouts/ManagerLayout';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';
import { Clock, User, Tag } from 'lucide-react';

const statusColors = {
  'todo': 'bg-muted text-muted-foreground',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'review': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'done': 'bg-green-500/20 text-green-400 border-green-500/30',
};

const priorityColors = {
  low: 'bg-slate-500/20 text-slate-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-amber-500/20 text-amber-400',
  urgent: 'bg-red-500/20 text-red-400',
};

export default function Tasks() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(setTasks(mockTasks));
  }, [dispatch]);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Management</h1>
          <p className="text-muted-foreground mt-2">Organize and track team tasks</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.status === column.id);
            
            return (
              <motion.div key={column.id} variants={fadeInUp}>
                <GlassmorphismCard className="h-full" hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{column.title}</h3>
                    <Badge variant="secondary" className="rounded-full">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg border border-border/50 bg-card/30 space-y-2 cursor-pointer transition-colors hover:bg-card/50"
                      >
                        <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                        
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className={priorityColors[task.priority]} variant="outline">
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border/30">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{task.assignedTo}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {task.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap pt-2">
                            {task.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </GlassmorphismCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </ManagerLayout>
  );
}
