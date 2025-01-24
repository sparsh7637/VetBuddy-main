import { gsap } from 'gsap';

export const fadeInUp = (element: string, delay: number = 0) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out'
  });
};

export const staggerFadeIn = (elements: string, stagger: number = 0.2) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger,
    duration: 0.8,
    ease: 'power2.out'
  });
};

export const scaleIn = (element: string, delay: number = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    delay,
    ease: 'back.out(1.7)'
  });
};

export const slideIn = (element: string, direction: 'left' | 'right' = 'left', delay: number = 0) => {
  return gsap.from(element, {
    x: direction === 'left' ? -100 : 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out'
  });
};
