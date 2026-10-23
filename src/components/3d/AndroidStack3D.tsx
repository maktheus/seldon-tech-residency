import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LAYERS = [
  {
    name: 'Aplicações (System & User Apps)',
    color: 0x06b6d4,
    y: 1.6,
    desc: 'Apps Kotlin/Java desenvolvidos com Jetpack Compose, Activities, Fragments e arquitetura MVVM.',
    techs: ['Jetpack Compose', 'Kotlin Coroutines', 'ViewModel', 'Room DB']
  },
  {
    name: 'Application Framework',
    color: 0x3b82f6,
    y: 0.8,
    desc: 'Serviços de alto nível que controlam o ciclo de vida, janelas, recursos, notificações e empacotamento.',
    techs: ['ActivityManager', 'WindowManager', 'PackageManager', 'NotificationManager']
  },
  {
    name: 'Android Runtime (ART) & Binder IPC',
    color: 0x8b5cf6,
    y: 0.0,
    desc: 'Motor de execução Ahead-of-Time (AOT) e JIT, Garbage Collector concorrente e barramento Binder IPC.',
    techs: ['ART Compaction GC', 'DEX Bytecode', 'Binder Driver (/dev/binder)', 'Bionic Libc']
  },
  {
    name: 'Hardware Abstraction Layer (HAL)',
    color: 0x10b981,
    y: -0.8,
    desc: 'Interfaces padrão de C/C++ que expõem os recursos dos periféricos físicos sem expor detalhes proprietários do silício.',
    techs: ['Camera HAL', 'Audio HAL', 'Sensors HAL', 'HIDL / AIDL']
  },
  {
    name: 'Kernel Linux & Drivers',
    color: 0xf59e0b,
    y: -1.6,
    desc: 'Núcleo do sistema operacional, drivers de SoC, escalonador de CPU, gerenciador de energia (wakelocks) e IPC.',
    techs: ['Linux CFS Scheduler', 'SELinux Enforcing', 'Ashmem', 'LowMemoryKiller (lmkd)']
  }
];

export const AndroidStack3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(4, 2.5, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x06b6d4, 2, 10);
    blueLight.position.set(-3, 0, 3);
    scene.add(blueLight);

    const group = new THREE.Group();
    scene.add(group);

    // Create 5 layered 3D slabs
    const meshes: THREE.Mesh[] = [];
    const layerWidth = 3.2;
    const layerDepth = 2.2;
    const layerHeight = 0.25;

    LAYERS.forEach((layer, i) => {
      const geo = new THREE.BoxGeometry(layerWidth, layerHeight, layerDepth);
      const mat = new THREE.MeshStandardMaterial({
        color: layer.color,
        roughness: 0.25,
        metalness: 0.6,
        transparent: true,
        opacity: 0.88,
        emissive: layer.color,
        emissiveIntensity: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { index: i };
      
      // Wireframe border
      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
      );
      mesh.add(line);

      group.add(mesh);
      meshes.push(mesh);
    });

    // Particle accents
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(150 * 3);
    for (let i = 0; i < 150 * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.03, transparent: true, opacity: 0.6 });
    const pMesh = new THREE.Points(pGeo, pMat);
    scene.add(pMesh);

    // Raycaster for click selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshes);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.index;
        if (typeof idx === 'number') {
          setSelectedLayerIndex(idx);
        }
      }
    };

    container.addEventListener('pointerdown', onPointerDown);

    // Mouse drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0.5;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotationY += delta * 0.008;
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth group rotation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.position.y = Math.sin(t * 1.2) * 0.08;

      // Animate layer positions based on isExploded state
      const spread = isExploded ? 0.75 : 0.32;
      meshes.forEach((mesh, idx) => {
        const targetY = (2 - idx) * spread;
        mesh.position.y += (targetY - mesh.position.y) * 0.1;

        // Highlight selected
        const isSelected = idx === selectedLayerIndex;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = isSelected ? 0.6 + Math.sin(t * 4) * 0.2 : 0.15;
        mesh.scale.set(isSelected ? 1.05 : 1, 1, isSelected ? 1.05 : 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(reqId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isExploded, selectedLayerIndex]);

  const activeLayer = LAYERS[selectedLayerIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* 3D Canvas Column */}
      <div className="lg:col-span-7 relative h-[420px] rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        
        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-900/90 border border-cyan-500/50 rounded-full text-xs font-mono text-cyan-300">
            AOSP Stack 3D • Explodir & Inspecionar
          </span>
          <button
            onClick={() => setIsExploded(!isExploded)}
            className="px-3 py-1 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/60 rounded-full text-xs font-mono text-cyan-200 transition-all cursor-pointer"
          >
            {isExploded ? '⤡ Compactar Camadas' : '⤢ Explodir Camadas'}
          </button>
        </div>

        <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 pointer-events-none">
          Arraste para rotacionar 3D • Clique em uma camada para inspecionar
        </div>
      </div>

      {/* Layer Details Column */}
      <div className="lg:col-span-5 space-y-4">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Camada {selectedLayerIndex + 1} de {LAYERS.length}
            </span>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: `#${LAYERS[selectedLayerIndex].color.toString(16).padStart(6, '0')}` }} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2 font-display">
            {activeLayer.name}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {activeLayer.desc}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Subcomponentes Chave no AOSP:</span>
            <div className="flex flex-wrap gap-2">
              {activeLayer.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Layer Quick Selectors */}
        <div className="grid grid-cols-5 gap-1.5">
          {LAYERS.map((layer, idx) => (
            <button
              key={layer.name}
              onClick={() => setSelectedLayerIndex(idx)}
              className={`py-2 px-1 text-center rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                selectedLayerIndex === idx
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              L{idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
