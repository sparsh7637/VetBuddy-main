import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import AnimatedStatistic from '../AnimatedStatistic';

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problem-stat', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[70vh] flex items-center bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Challenge We're Solving
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="problem-stat">
            <AnimatedStatistic
              value={65}
              suffix="%"
              label="of pet deaths involve misdiagnoses"
              className="bg-white rounded-lg shadow-lg p-6"
            />
          </div>

          <div className="problem-stat">
            <AnimatedStatistic
              prefix="+"
              value={45}
              suffix="%"
              label="Complex drug interactions are overlooked"
              className="bg-white rounded-lg shadow-lg p-6"
            />
          </div>

          <div className="problem-stat">
            <AnimatedStatistic
              value={120}
              suffix="min"
              label="Average time spent researching per day"
              className="bg-white rounded-lg shadow-lg p-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}