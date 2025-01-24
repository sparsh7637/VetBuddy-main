import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Globe, Clock, FileText } from 'lucide-react';
import { Card } from '../ui/card';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Mic className="w-8 h-8 text-blue-600" />,
    title: "Instant Voice-to-Text",
    description: "Convert spoken words to text in real-time during consultations"
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: "Multi-language Support",
    description: "Transcribe and translate in 10+ Asian languages"
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-600" />,
    title: "Save 2+ Hours Daily",
    description: "Reduce documentation time by 60% with automated transcription"
  },
  {
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    title: "Smart Templates",
    description: "Auto-format transcriptions into clinical notes"
  }
];

export default function VoiceTranscription() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.transcription-card', {
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

      // Animated demo text
      gsap.to('.typing-demo', {
        scrollTrigger: {
          trigger: '.typing-demo',
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play pause resume reset'
        },
        width: '100%',
        duration: 3,
        ease: 'none',
        repeat: -1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Voice-Powered Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your workflow with AI-powered voice transcription. 
            Speak naturally in your preferred language while VetBuddy handles the documentation.
          </p>
        </motion.div>

        {/* Live Demo Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="typing-demo overflow-hidden whitespace-nowrap border-r-2 border-blue-600 h-8">
              "Patient shows signs of improved mobility after treatment..."
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transcription-card p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
