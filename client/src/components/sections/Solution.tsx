import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Zap, Shield, Database } from 'lucide-react';
import { Card } from '../ui/card';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: "Real-time prescription suggestions",
    description: "AI-powered recommendations based on symptoms and history"
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: "Advanced drug interaction checks",
    description: "Prevent complications with comprehensive drug analysis"
  },
  {
    icon: <Database className="w-8 h-8 text-blue-600" />,
    title: "Universal health records",
    description: "Complete medical history at your fingertips"
  }
];

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        stagger: 0.3,
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            The VetBuddy Solution
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
