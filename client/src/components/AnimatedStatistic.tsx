import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedStatisticProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}

export default function AnimatedStatistic({
  value,
  prefix = '',
  suffix = '',
  label,
  className
}: AnimatedStatisticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView && counterRef.current) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();
      
      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * end);
        if (counterRef.current) {
          counterRef.current.textContent = `${prefix}${current}${suffix}`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value, prefix, suffix]);

  return (
    <motion.div
      ref={ref}
      className={cn("text-center p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <span
        ref={counterRef}
        className="text-4xl md:text-5xl font-bold text-blue-600"
      >
        {prefix}0{suffix}
      </span>
      <p className="text-gray-600 mt-4">{label}</p>
    </motion.div>
  );
}
