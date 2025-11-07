import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { hoverGlow } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassmorphismCard = ({ children, className, hover = true }: GlassmorphismCardProps) => {
  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl p-6',
        'shadow-card',
        className
      )}
      variants={hover ? hoverGlow : undefined}
      initial="initial"
      whileHover={hover ? "hover" : undefined}
    >
      {children}
    </motion.div>
  );
};
