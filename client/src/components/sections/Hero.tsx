import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { gsap, ScrollTrigger, TextPlugin } from '../../lib/gsap-config';
import { Button } from '../ui/button';
import { Heart, Stethoscope, Activity } from 'lucide-react';
import vetbuddyLogo from './vetbuddy_logo.png';
import nusLogo from './nusen.png';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const messages = [
  "AI-Powered Veterinary Assistant",
  "Smart Clinical Documentation",
  "Real-time Health Monitoring",
  "Instant Treatment Suggestions",
  "Streamlined Pet Care Workflow"
];

const taglineWords = ["Smarter AI 💡", "Healthier Pets🐾", "Happier Vets 😊"];

const ParticlesBackground = () => {
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#1e40af" }, // Darker blue
            shape: {
              type: ["circle", "triangle"],
              options: {
                triangle: {
                  sides: 3
                }
              }
            },
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
              color: "#1e40af", // Darker blue
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
                mode: ["grab", "bubble"]
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: 0.5
                }
              },
              bubble: {
                distance: 200,
                size: 6,
                duration: 0.3
              }
            }
          },
          retina_detect: true,
        }}
      />
    </div>
  );
};

const GridBackground = () => (
  <div className="absolute inset-0 -z-20">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>
);

const FloatingIcons = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[Heart, Stethoscope, Activity].map((Icon, index) => (
      <motion.div
        key={index}
        className="absolute"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight,
          opacity: 0 
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3 + index,
          repeat: Infinity,
          delay: index * 0.8,
        }}
      >
        <Icon className="w-8 h-8 text-blue-400/30" />
      </motion.div>
    ))}
  </div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const typedTextRef = useRef<HTMLParagraphElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out'
      });

      const tl = gsap.timeline({ repeat: -1 });
      messages.forEach(message => {
        tl.to(typedTextRef.current, {
          duration: 1,
          text: message,
          ease: "none"
        })
        .to({}, { duration: 1.5 })
        .to(typedTextRef.current, {
          duration: 0.5,
          text: "",
          ease: "none"
        });
      });

      gsap.to('.highlight-text', {
        backgroundPosition: '200% center',
        duration: 4,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.parallax-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden pb-20 bg-gradient-to-b from-blue-900/5 via-blue-800/10 to-blue-900/5">
      <ParticlesBackground />
      <GridBackground />
      <FloatingIcons />
      <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50" />

      <div className="container mx-auto px-4 pt-40 md:pt-48 relative z-10">
        <motion.div 
          ref={textRef}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center justify-center mb-6">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1],
                transition: { duration: 0.3 }
              }}
              className="relative"
            >
              <img
                src={vetbuddyLogo}
                alt="VetBuddy Logo"
                className="w-32 h-32 md:w-40 md:h-40 mb-4 object-contain object-center drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300"
                style={{
                  filter: 'brightness(1.05) contrast(1.05)',
                  imageRendering: 'crisp-edges'
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full -z-10 transform scale-110"
                animate={{
                  scale: [1.1, 1.2, 1.1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <h1 className="highlight-text text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%] bg-clip-text text-transparent mb-8">
              VetBuddy
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {taglineWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className={`text-xl md:text-2xl font-medium px-4 py-2 rounded-full cursor-pointer ${
                    index === 0
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : index === 1
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="h-5 mb-8">
            <p 
              ref={typedTextRef}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed min-h-[4rem]"
            ></p>
          </div>

          <div className="mt-2 mb-2">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 md:px-12 py-6 md:py-7 text-lg md:text-xl rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => {
                window.location.href = 'https://myaiclinic.replit.app';
              }}
            >
              Get Started Now
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full mt-16">
        <motion.div 
          className="flex flex-col items-center gap-4 text-gray-600 z-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-sm md:text-base font-medium">Backed by</p>
          <motion.img 
            src={nusLogo}
            alt="NUS Enterprise"
            className="h-10 md:h-12 lg:h-16 w-auto object-contain transition-all duration-300"
            style={{ 
              maxWidth: '180px',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
            }}
            whileHover={{ 
              scale: 1.05,
              filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))'
            }}
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}