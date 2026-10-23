import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const EnergySoC3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProfile, setLoadProfile] = useState<'idle' | 'balanced' | 'gaming' | 'deep_doze'>('balanced');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 4.5, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf59e0b, 3, 20);
    pointLight.position.set(0, 5, 2);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // Silicon Substrate / Die Base
    const baseGeo = new THREE.BoxGeometry(4, 0.2, 4);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    group.add(baseMesh);

    // Pins on the perimeter
    const pinGeo = new THREE.BoxGeometry(0.08, 0.05, 0.2);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
    for (let i = -18; i <= 18; i += 2) {
      const pin1 = new THREE.Mesh(pinGeo, pinMat);
      pin1.position.set(i * 0.1, -0.05, 2.05);
      group.add(pin1);

      const pin2 = new THREE.Mesh(pinGeo, pinMat);
      pin2.position.set(i * 0.1, -0.05, -2.05);
      group.add(pin2);
    }

    // Cores on the SoC:
    // 1. Prime Cortex-X Core (High Performance)
    // 2. 3x Performance Cores (Cortex-A715)
    // 3. 4x Efficiency Cores (Cortex-A510)
    // 4. GPU Cluster (Adreno / Mali)
    // 5. NPU AI Core & Modem
    const coreCubes: { mesh: THREE.Mesh; type: 'prime' | 'perf' | 'eff' | 'gpu' | 'npu' }[] = [];

    const createCoreMesh = (w: number, d: number, x: number, z: number, type: 'prime' | 'perf' | 'eff' | 'gpu' | 'npu', color: number) => {
      const geo = new THREE.BoxGeometry(w, 0.25, d);
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.7
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 0.2, z);

      // Edges wireframe
      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }));
      mesh.add(line);

      group.add(mesh);
      coreCubes.push({ mesh, type });
    };

    // Prime Core
    createCoreMesh(1.1, 1.1, -1.0, -1.0, 'prime', 0xef4444);
    // Perf Cores
    createCoreMesh(0.9, 0.8, -1.0, 0.4, 'perf', 0xf59e0b);
    createCoreMesh(0.9, 0.8, -1.0, 1.3, 'perf', 0xf59e0b);
    // Efficiency Cores (LITTLE)
    createCoreMesh(0.7, 0.5, 0.4, 0.3, 'eff', 0x10b981);
    createCoreMesh(0.7, 0.5, 0.4, 0.9, 'eff', 0x10b981);
    createCoreMesh(0.7, 0.5, 0.4, 1.5, 'eff', 0x10b981);
    // GPU
    createCoreMesh(1.4, 1.4, 0.9, -1.0, 'gpu', 0x8b5cf6);
    // NPU / Modem
    createCoreMesh(0.9, 0.9, -0.1, -0.1, 'npu', 0x06b6d4);

    // Heat Glow particles above chip
    const heatGeo = new THREE.BufferGeometry();
    const heatCount = 120;
    const heatPos = new Float32Array(heatCount * 3);
    for (let i = 0; i < heatCount; i++) {
      heatPos[i * 3] = (Math.random() - 0.5) * 3;
      heatPos[i * 3 + 1] = 0.3 + Math.random() * 1.5;
      heatPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    heatGeo.setAttribute('position', new THREE.BufferAttribute(heatPos, 3));
    const heatMat = new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.04, transparent: true, opacity: 0.7 });
    const heatMesh = new THREE.Points(heatGeo, heatMat);
    group.add(heatMesh);

    // Mouse drag rotation
    let isDragging = false;
    let prevX = 0;
    let rotY = 0.4;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      prevX = e.clientX;
      rotY += dx * 0.008;
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y += (rotY - group.rotation.y) * 0.05;
      group.rotation.x = 0.35 + Math.sin(elapsed * 0.8) * 0.04;

      // Color intensity based on loadProfile
      const isGaming = loadProfile === 'gaming';
      const isDoze = loadProfile === 'deep_doze';

      coreCubes.forEach((c) => {
        const mat = c.mesh.material as THREE.MeshStandardMaterial;
        if (isDoze) {
          mat.emissiveIntensity = 0.05;
          c.mesh.position.y = 0.15;
        } else if (isGaming) {
          mat.emissiveIntensity = 0.8 + Math.sin(elapsed * 6) * 0.3;
          c.mesh.position.y = 0.2 + (c.type === 'prime' || c.type === 'gpu' ? 0.08 : 0);
        } else {
          mat.emissiveIntensity = 0.3 + Math.sin(elapsed * 2) * 0.1;
          c.mesh.position.y = 0.2;
        }
      });

      // Animate heat particles rising
      const pos = heatGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < heatCount; i++) {
        pos[i * 3 + 1] += 0.015;
        if (pos[i * 3 + 1] > 2.0) {
          pos[i * 3 + 1] = 0.3;
        }
      }
      heatGeo.attributes.position.needsUpdate = true;

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
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(reqId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [loadProfile]);

  const profileData = {
    deep_doze: {
      power: '8 mW',
      temp: '27.4 °C',
      coresActive: '0 / 8 Cores (Deep Sleep C-States)',
      wakelocks: 'Bloqueados (Suspended)',
      batteryDuration: '~720 Horas Standby',
      desc: 'Modo Deep Doze AOSP: CPU em C-State profundo, rádio celular em repouso e zero wakelocks de terceiros acordando o dispositivo.'
    },
    idle: {
      power: '120 mW',
      temp: '29.8 °C',
      coresActive: '1x LITTLE Core @ 600MHz',
      wakelocks: 'Apenas alarmes do sistema',
      batteryDuration: '~48 Horas',
      desc: 'Tela ligada em repouso no launcher com governor Schedutil mantendo a menor frequência energética.'
    },
    balanced: {
      power: '950 mW',
      temp: '34.2 °C',
      coresActive: '4x LITTLE + 1x Perf Core @ 1.4GHz',
      wakelocks: 'Trabalho via WorkManager',
      batteryDuration: '~9.5 Horas de Tela',
      desc: 'Navegação e reprodução de mídia com escalonamento DVFS dinâmico equilibrando eficiência e 60 FPS.'
    },
    gaming: {
      power: '4.850 mW (4.85 W)',
      temp: '43.6 °C (Thermal Throttling iminente)',
      coresActive: 'Todos os 8 Cores + GPU Adreno a 850MHz',
      wakelocks: 'PARTIAL_WAKE_LOCK ativo',
      batteryDuration: '~2.8 Horas intensivas',
      desc: 'Carga máxima: Prime Core a 3.2GHz e GPU em clock boost. Consumo 40x maior que em idle.'
    }
  }[loadProfile];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-7 relative h-[420px] rounded-2xl glass-panel border border-amber-500/30 overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-900/90 border border-amber-500/50 rounded-full text-xs font-mono text-amber-300">
            SoC Thermal & Power Core 3D
          </span>
        </div>

        <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 pointer-events-none">
          Arraste o chip 3D para examinar os núcleos Prime (vermelho), Performance (amarelo) e LITTLE (verde)
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Perfil Energético / Estado Térmico
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-[11px] font-mono text-amber-300">
              {profileData.temp}
            </span>
          </div>

          {/* Profile Switcher */}
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {(['deep_doze', 'idle', 'balanced', 'gaming'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setLoadProfile(p)}
                className={`py-2 px-1 text-center rounded-lg text-[10px] font-mono uppercase font-bold border transition-all cursor-pointer ${
                  loadProfile === p
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {p === 'deep_doze' ? 'Doze' : p}
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            {profileData.desc}
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Potência Instantânea</span>
              <span className="text-amber-400 font-bold text-sm">{profileData.power}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Núcleos Ativos</span>
              <span className="text-emerald-400 font-bold text-xs">{profileData.coresActive}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-[10px]">Autonomia Estimada da Bateria</span>
              <span className="text-cyan-300 font-bold text-sm">{profileData.batteryDuration}</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-slate-300 flex items-start gap-2">
          <span className="text-amber-400 text-base">⚡</span>
          <div>
            <strong className="text-white">Arquitetura big.LITTLE / DynamIQ:</strong> O escalonador EAS (Energy-Aware Scheduler) do kernel Linux direciona tarefas leves da interface para os núcleos eficientes (LITTLE) consumindo até 5x menos energia por instrução executada.
          </div>
        </div>
      </div>
    </div>
  );
};
