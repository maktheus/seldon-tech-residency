import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SeldonHeroSceneProps {
  activeModuleId: number | null;
  onSelectModule: (id: number) => void;
}

export const SeldonHeroScene: React.FC<SeldonHeroSceneProps> = ({ activeModuleId, onSelectModule }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLightCyan.position.set(3, 4, 3);
    scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 3, 20);
    pointLightViolet.position.set(-3, -3, 3);
    scene.add(pointLightViolet);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Seldon Hologram Core (Wireframe + Inner Glowing Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x083344,
      emissiveIntensity: 0.6
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner Glowing Sphere
    const innerGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Orbiting Rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.3, 0.012, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 5;
    mainGroup.add(ring3);

    // 4 Satellite Orbiting Nodes (Representing Modules 1, 2, 3, 4)
    const moduleColors = [0x06b6d4, 0x8b5cf6, 0x10b981, 0xf59e0b];
    const moduleNodes: THREE.Mesh[] = [];
    const moduleOrbitRadii = [2.4, 2.7, 3.0, 3.3];
    const moduleSpeeds = [0.012, -0.01, 0.008, -0.007];
    const moduleAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];

    moduleColors.forEach((color, i) => {
      const nodeGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.5
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { moduleId: i + 1 };
      mainGroup.add(nodeMesh);
      moduleNodes.push(nodeMesh);
    });

    // Cosmic Particle Field
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x10b981),
      new THREE.Color(0xf59e0b)
    ];

    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = r * Math.cos(phi);

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Raycaster for interactive clicking
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(moduleNodes);

      if (intersects.length > 0) {
        const modId = intersects[0].object.userData.moduleId;
        if (modId) onSelectModule(modId);
      }
    };

    container.addEventListener('click', onClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.15 + mouseX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + mouseY * 0.5;

      coreMesh.rotation.y = -elapsedTime * 0.25;
      coreMesh.rotation.z = Math.sin(elapsedTime * 0.3) * 0.15;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;
      ring3.rotation.y = elapsedTime * 0.1;

      // Pulse inner sphere
      const scale = 0.85 + Math.sin(elapsedTime * 2) * 0.06;
      innerMesh.scale.set(scale, scale, scale);

      // Animate module satellite nodes in their orbit
      moduleNodes.forEach((node, idx) => {
        const angle = moduleAngles[idx] + elapsedTime * moduleSpeeds[idx] * 4;
        const rad = moduleOrbitRadii[idx];
        const height = Math.sin(elapsedTime * 1.5 + idx) * 0.4;
        node.position.set(Math.cos(angle) * rad, height, Math.sin(angle) * rad);

        // Highlight active module node
        if (activeModuleId === idx + 1) {
          node.scale.set(1.5, 1.5, 1.5);
        } else {
          node.scale.set(1, 1, 1);
        }
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeModuleId, onSelectModule]);

  return (
    <div className="relative w-full h-[480px] md:h-[580px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl">
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      
      {/* Floating HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Seldon Core 3D Hologram • Interativo
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-xs text-slate-400 font-mono">
        <span className="bg-slate-900/80 px-3 py-1 rounded border border-slate-700/50">
          Gire o mouse para rotacionar o núcleo • Clique nas esferas orbitais para selecionar o módulo
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"/> M1: Comum</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-400 inline-block"/> M2: IA</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"/> M3: Sec</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/> M4: Energia</span>
        </div>
      </div>
    </div>
  );
};
