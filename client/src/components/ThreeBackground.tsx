import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const mouseTrailRef = useRef<THREE.Points | null>(null);
  const petModelsRef = useRef<THREE.Group[]>([]);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    rendererRef.current.setPixelRatio(pixelRatio);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouseRef.current.set(x, y);
  }, []);

  // Handle touch movement
  const handleTouchMove = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    const x = (touch.clientX / window.innerWidth) * 2 - 1;
    const y = -(touch.clientY / window.innerHeight) * 2 + 1;
    mouseRef.current.set(x, y);
  }, []);

  // Create pet silhouette
  const createPetModel = useCallback(() => {
    const group = new THREE.Group();

    // Create basic pet silhouette (simplified dog shape)
    const bodyGeometry = new THREE.CapsuleGeometry(0.2, 0.4, 4, 8);
    const headGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const earGeometry = new THREE.ConeGeometry(0.08, 0.2, 4);
    const tailGeometry = new THREE.CylinderGeometry(0.05, 0.02, 0.3, 4);

    const material = new THREE.MeshPhongMaterial({
      color: 0x4299e1,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });

    const body = new THREE.Mesh(bodyGeometry, material);
    const head = new THREE.Mesh(headGeometry, material);
    const earLeft = new THREE.Mesh(earGeometry, material);
    const earRight = new THREE.Mesh(earGeometry, material);
    const tail = new THREE.Mesh(tailGeometry, material);

    head.position.x = 0.3;
    head.position.y = 0.1;
    
    earLeft.position.x = 0.35;
    earLeft.position.y = 0.3;
    earLeft.rotation.z = -0.3;
    
    earRight.position.x = 0.35;
    earRight.position.y = 0.3;
    earRight.position.z = 0.1;
    earRight.rotation.z = -0.3;
    
    tail.position.x = -0.4;
    tail.position.y = 0.1;
    tail.rotation.z = -0.5;

    group.add(body, head, earLeft, earRight, tail);
    return group;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup with dynamic FOV based on device
    const fov = window.innerWidth < 768 ? 90 : 75;
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;

    // Renderer setup with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(ambientLight, directionalLight);

    // Create improved gradient mesh
    const geometry = new THREE.PlaneGeometry(8, 8, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        mousePosition: { value: new THREE.Vector2(0, 0) },
        color1: { value: new THREE.Color(0x1e3a8a) }, // Darker blue
        color2: { value: new THREE.Color(0x1e40af) }, // Deep blue
        color3: { value: new THREE.Color(0x3b82f6) }, // Bright blue for contrast
        logoPosition: { value: new THREE.Vector2(0.5, 0.92) },
        logoBackgroundColor: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec2 logoPosition;
        uniform vec2 mousePosition;

        float getDampening(vec2 position) {
          float dist = length(position - logoPosition);
          return smoothstep(0.0, 0.5, dist);
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          float dampening = getDampening(uv);
          float mouseInfluence = length(uv - mousePosition) < 0.3 ? 0.08 : 0.0;

          pos.z += sin(pos.x * 2.0 + time) * 0.03 * dampening;
          pos.z += cos(pos.y * 2.0 + time) * 0.03 * dampening;
          pos.z += mouseInfluence * sin(time * 3.0);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mousePosition;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec2 logoPosition;
        uniform vec3 logoBackgroundColor;
        varying vec2 vUv;
        
        float createGlow(vec2 position, vec2 center, float radius) {
          float dist = length(position - center);
          return smoothstep(radius, 0.0, dist);
        }
        
        void main() {
          vec2 position = vUv;
          vec2 center = vec2(0.5);
          float dist = length(position - center);
          
          float mouseGlow = createGlow(position, mousePosition, 0.2);
          float logoArea = createGlow(position, logoPosition, 0.2);
          
          float waveIntensity = mix(0.3, 0.1, logoArea);
          float wave = sin(dist * 5.0 - time) * waveIntensity + 0.7;
          float wave2 = cos(dist * 4.0 - time * 1.2) * waveIntensity + 0.7;
          
          vec3 color = mix(color1, color2, wave);
          color = mix(color, color3, wave2);
          
          float glow = createGlow(position, logoPosition, 0.2);
          color = mix(color, logoBackgroundColor, glow * 0.4);
          
          float logoProximity = createGlow(position, logoPosition, 0.2);
          color = mix(color, logoBackgroundColor, logoProximity * 0.7);
          
          color = mix(color, vec3(1.0), mouseGlow * 0.3);
          
          float alpha = smoothstep(1.0, 0.7, dist);
          alpha = mix(alpha * 0.7, 0.8, logoProximity);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add pet models
    const petCount = window.innerWidth < 768 ? 3 : 5;
    for (let i = 0; i < petCount; i++) {
      const pet = createPetModel();
      pet.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2
      );
      pet.scale.setScalar(0.5);
      scene.add(pet);
      petModelsRef.current.push(pet);
    }

    // Create particles
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    const particleGeometry = new THREE.SphereGeometry(0.02);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e40af, // Darker blue
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      scene.add(particle);
      particlesRef.current.push({
        mesh: particle,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        originalPosition: particle.position.clone(),
      });
    }

    // Create mouse trail
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(30 * 3);
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    
    const trailMaterial = new THREE.PointsMaterial({
      color: 0x4299e1,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });

    const trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trail);
    mouseTrailRef.current = trail;

    camera.position.z = 5;

    // Improved animation with delta time
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (materialRef.current) {
        materialRef.current.uniforms.time.value += deltaTime * 0.3;
        materialRef.current.uniforms.mousePosition.value = mouseRef.current;
      }

      // Animate pet models
      petModelsRef.current.forEach((pet, index) => {
        pet.rotation.y += deltaTime * 0.5;
        pet.position.y += Math.sin(currentTime * 0.001 + index) * 0.01;
        
        const mouseInfluence = new THREE.Vector3(
          mouseRef.current.x * 5 - pet.position.x,
          mouseRef.current.y * 5 - pet.position.y,
          0
        );
        
        if (mouseInfluence.length() < 2) {
          mouseInfluence.normalize().multiplyScalar(0.02);
          pet.position.add(mouseInfluence);
        }
      });

      // Update particles
      particlesRef.current.forEach((particle) => {
        const mouseInfluence = particle.mesh.position
          .clone()
          .sub(new THREE.Vector3(mouseRef.current.x * 5, mouseRef.current.y * 5, 0));
        
        if (mouseInfluence.length() < 2) {
          mouseInfluence.normalize().multiplyScalar(0.05);
          particle.mesh.position.add(mouseInfluence);
        }

        particle.mesh.position.add(particle.velocity);

        // Return to original position
        const toOriginal = particle.originalPosition
          .clone()
          .sub(particle.mesh.position)
          .multiplyScalar(0.01);
        particle.mesh.position.add(toOriginal);
      });

      // Update mouse trail
      if (mouseTrailRef.current) {
        const positions = mouseTrailRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = positions.length - 1; i > 2; i -= 3) {
          positions[i] = positions[i - 3];
          positions[i - 1] = positions[i - 4];
          positions[i - 2] = positions[i - 5];
        }
        positions[0] = mouseRef.current.x * 5;
        positions[1] = mouseRef.current.y * 5;
        positions[2] = 0;
        mouseTrailRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate(0);

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [handleResize, handleMouseMove, handleTouchMove, createPetModel]);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-blue-900/10 to-blue-950/5 bg-opacity-90"
    />
  );
}