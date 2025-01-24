import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const steps = [
  { text: "Better Care", color: "text-blue-600" },
  { text: "Smarter Decisions", color: "text-indigo-600" },
  { text: "Happier Pets", color: "text-purple-600" }
];

export default function Integration() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.flow-step', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        stagger: 0.3,
      });

      gsap.to('.connecting-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
        },
        width: '100%',
        duration: 1.5,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything Integrated
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="connecting-line absolute top-1/2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2" />

          <div className="relative z-10 grid md:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flow-step flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mb-3">
                  <span className={`text-xl font-bold ${step.color}`}>
                    {index + 1}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold ${step.color}`}>
                  {step.text}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}