import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-config';
import Header from '../components/Header';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import VoiceTranscription from '../components/sections/VoiceTranscription';
import WhyVetBuddy from '../components/sections/WhyVetBuddy';
import Integration from '../components/sections/Integration';
import CallToAction from '../components/sections/CallToAction';
import Footer from '../components/sections/Footer';
import ThreeBackground from '../components/ThreeBackground';
import ScrollProgress from '../components/ScrollProgress';

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <ThreeBackground />
      <ScrollProgress />
      <Header />

      <main className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <div id="problem">
          <Problem />
        </div>
        <div id="voice">
          <VoiceTranscription />
        </div>
        <div id="solution">
          <Solution />
        </div>
        <div id="why">
          <WhyVetBuddy />
        </div>
        <div id="integration">
          <Integration />
        </div>
        <div id="cta">
          <CallToAction />
        </div>
        <Footer />
      </main>
    </div>
  );
}