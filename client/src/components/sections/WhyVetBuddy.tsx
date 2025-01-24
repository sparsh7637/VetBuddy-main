import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Activity, Clock, LineChart } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Brain className="w-16 h-16 text-blue-600" />,
    title: "AI-Powered Diagnostics",
    description: "Advanced machine learning algorithms provide real-time diagnostic assistance with unprecedented accuracy, enabling faster and more reliable pet health assessments.",
    model: "Brain",
    color: "#4299e1"
  },
  {
    icon: <Activity className="w-16 h-16 text-blue-600" />,
    title: "Smart Practice Management",
    description: "Streamline your entire practice with AI-driven workflows and automated administrative tasks, giving you more time to focus on what matters most - pet care.",
    model: "Dashboard",
    color: "#63b3ed"
  },
  {
    icon: <Clock className="w-16 h-16 text-blue-600" />,
    title: "Real-time Pet Health Monitoring",
    description: "Continuous monitoring and instant alerts for critical changes in pet health parameters, ensuring proactive care and better outcomes for your patients.",
    model: "Monitor",
    color: "#90cdf4"
  },
  {
    icon: <LineChart className="w-16 h-16 text-blue-600" />,
    title: "Predictive Healthcare Insights",
    description: "Anticipate health issues before they become critical with our predictive analytics engine, enabling preventive care strategies that keep pets healthier longer.",
    model: "Chart",
    color: "#7ea6f0"
  }
];

const Model = ({ name, color }: { name: string; color: string }) => {
  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
      {name === "Brain" && (
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhongMaterial color={color} />
        </mesh>
      )}
      {name === "Dashboard" && (
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshPhongMaterial color={color} />
        </mesh>
      )}
      {name === "Monitor" && (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 0.7, 0.1]} />
            <meshPhongMaterial color={color} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.1, 0.2, 0.3, 8]} />
            <meshPhongMaterial color={color} />
          </mesh>
        </group>
      )}
      {name === "Chart" && (
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
            <meshPhongMaterial color={color} />
          </mesh>
          <mesh position={[0.3, 0.2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 1.4, 16]} />
            <meshPhongMaterial color={color} />
          </mesh>
          <mesh position={[-0.3, -0.1, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
            <meshPhongMaterial color={color} />
          </mesh>
        </group>
      )}
    </Float>
  );
};

const ParticlesBackground = () => {
  const particlesInit = async (engine: Engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to load particles:", error);
    }
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            opacity: 0
          },
          fpsLimit: 60,
          particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#1e40af" }, 
            opacity: { 
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.2,
                sync: false
              }
            },
            size: { 
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outMode: "out",
              bounce: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
            links: {
              enable: true,
              color: "#1e40af", 
              opacity: 0.3,
              distance: 150,
              width: 1
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: 0.5
                }
              }
            }
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default function WhyVetBuddy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center overflow-hidden py-24 bg-gradient-to-b from-blue-900/5 via-blue-800/10 to-blue-900/5"
    >
      <ParticlesBackground />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            The Future of Veterinary Care
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Experience the future of veterinary practice with our innovative AI-powered solutions that transform how you care for pets
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group relative"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="absolute -right-4 -top-4 w-24 h-24">
                  <Canvas shadows>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <Model name={feature.model} color={feature.color} />
                  </Canvas>
                </div>
                <motion.div 
                  className="mb-8"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}