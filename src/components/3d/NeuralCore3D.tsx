import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const NeuralCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quantMode, setQuantMode] = useState<'fp32' | 'fp16' | 'int8'>('int8');
  const [activeLayer, setActiveLayer] = useState<number>(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 3, 20);
    pointLight.position.set(2, 4, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // Build Neural Layers (Input: 4 nodes, Hidden 1: 6 nodes, Hidden 2: 6 nodes, Output: 3 nodes)
    const layerSizes = [4, 6, 6, 3];
    const layerSpacingX = 2.2;
    const nodeSpacingY = 0.9;
    const nodes: { mesh: THREE.Mesh; layerIdx: number; nodeIdx: number }[] = [];
    const nodeCoords: THREE.Vector3[][] = [];

    const nodeGeo = new THREE.SphereGeometry(0.18, 24, 24);

    layerSizes.forEach((size, layerIdx) => {
      const coords: THREE.Vector3[] = [];
      const x = (layerIdx - 1.5) * layerSpacingX;

      for (let i = 0; i < size; i++) {
        const y = (i - (size - 1) / 2) * nodeSpacingY;
        const z = (Math.random() - 0.5) * 0.4;
        const pos = new THREE.Vector3(x, y, z);
        coords.push(pos);

        const nodeColor = layerIdx === 0 ? 0x06b6d4 : layerIdx === 3 ? 0x10b981 : 0x8b5cf6;
        const nodeMat = new THREE.MeshStandardMaterial({
          color: nodeColor,
          emissive: nodeColor,
          emissiveIntensity: 0.5,
          roughness: 0.3
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(pos);
        group.add(nodeMesh);
        nodes.push({ mesh: nodeMesh, layerIdx, nodeIdx: i });
      }
      nodeCoords.push(coords);
    });

    // Build Synaptic Connections between layers
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.25
    });

    for (let l = 0; l < nodeCoords.length - 1; l++) {
      const currentLayer = nodeCoords[l];
      const nextLayer = nodeCoords[l + 1];

      for (const p1 of currentLayer) {
        for (const p2 of nextLayer) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
          const line = new THREE.Line(lineGeo, lineMat);
          group.add(line);
        }
      }
    }

    // Moving Signal Pulses (Data Flow)
    const pulseCount = 35;
    const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pulses: {
      mesh: THREE.Mesh;
      fromLayer: number;
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < pulseCount; i++) {
      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      const fromLayer = Math.floor(Math.random() * (layerSizes.length - 1));
      const fromNode = Math.floor(Math.random() * layerSizes[fromLayer]);
      const toNode = Math.floor(Math.random() * layerSizes[fromLayer + 1]);
      pulses.push({
        mesh: pMesh,
        fromLayer,
        fromNode,
        toNode,
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.02
      });
      group.add(pMesh);
    }

    // Drag / Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.5;
      targetRotX = y * 0.3;
    };

    container.addEventListener('mousemove', onMouseMove);

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetRotY - mouseX) * 0.05;
      mouseY += (targetRotX - mouseY) * 0.05;

      group.rotation.y = mouseX;
      group.rotation.x = mouseY + Math.sin(elapsed * 0.8) * 0.05;

      // Pulse update
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.fromLayer = Math.floor(Math.random() * (layerSizes.length - 1));
          pulse.fromNode = Math.floor(Math.random() * layerSizes[pulse.fromLayer]);
          pulse.toNode = Math.floor(Math.random() * layerSizes[pulse.fromLayer + 1]);
        }

        const p1 = nodeCoords[pulse.fromLayer][pulse.fromNode];
        const p2 = nodeCoords[pulse.fromLayer + 1][pulse.toNode];
        pulse.mesh.position.lerpVectors(p1, p2, pulse.progress);
      });

      // Node subtle animation
      nodes.forEach((n) => {
        const mat = n.mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.4 + Math.sin(elapsed * 3 + n.nodeIdx) * 0.3;
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
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(reqId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [quantMode]);

  const quantDetails = {
    fp32: {
      precision: 'Float 32-bit (Padrão)',
      weightsBytes: '4 bytes / peso',
      modelSize: '16.4 MB',
      latency: '82 ms / inferência',
      energy: '1.82 mWh',
      ram: '64 MB RAM',
      benefit: 'Acurácia máxima (100%), porém alto consumo de energia e latência em CPU móvel.'
    },
    fp16: {
      precision: 'Half Float 16-bit',
      weightsBytes: '2 bytes / peso',
      modelSize: '8.2 MB',
      latency: '44 ms / inferência',
      energy: '0.95 mWh',
      ram: '32 MB RAM',
      benefit: 'Excelente equilíbrio para GPUs mobile modernas com instruções de precisão mista.'
    },
    int8: {
      precision: 'Integer 8-bit Quantizado (LiteRT / NNAPI)',
      weightsBytes: '1 byte / peso',
      modelSize: '4.1 MB',
      latency: '18 ms / inferência',
      energy: '0.41 mWh',
      ram: '16 MB RAM',
      benefit: 'Redução de 75% na memória e latência 4x menor com aceleração em NPU/DSP e quase zero perda de acurácia.'
    }
  }[quantMode];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* 3D Visualizer Canvas */}
      <div className="lg:col-span-7 relative h-[420px] rounded-2xl glass-panel border border-violet-500/30 overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-900/90 border border-violet-500/50 rounded-full text-xs font-mono text-violet-300">
            Rede Neural 3D On-Device • {quantMode.toUpperCase()}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 pointer-events-none">
          Mova o cursor para navegar na geometria dos pesos sinápticos
        </div>
      </div>

      {/* Quantization Controls and Metrics */}
      <div className="lg:col-span-5 space-y-4">
        <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-violet-400">
              Modo de Quantização On-Device
            </span>
            <span className="px-2 py-0.5 rounded bg-violet-950/80 border border-violet-500/50 text-[11px] font-mono text-violet-200">
              LiteRT / NNAPI
            </span>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {(['fp32', 'fp16', 'int8'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setQuantMode(mode)}
                className={`py-2 px-2 text-center rounded-lg text-xs font-mono uppercase font-bold border transition-all cursor-pointer ${
                  quantMode === mode
                    ? 'bg-violet-600/30 border-violet-400 text-violet-100 shadow-lg shadow-violet-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <h4 className="text-lg font-bold text-white mb-1 font-display">
            {quantDetails.precision}
          </h4>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            {quantDetails.benefit}
          </p>

          {/* Metrics comparison grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Tamanho do Modelo</span>
              <span className="text-violet-300 font-bold text-sm">{quantDetails.modelSize}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Latência (NPU/CPU)</span>
              <span className="text-emerald-400 font-bold text-sm">{quantDetails.latency}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Consumo Energético</span>
              <span className="text-amber-300 font-bold text-sm">{quantDetails.energy}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Ocupação de RAM</span>
              <span className="text-cyan-300 font-bold text-sm">{quantDetails.ram}</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-violet-950/20 border border-violet-800/40 rounded-xl text-xs text-slate-300 flex items-start gap-2">
          <span className="text-violet-400 text-base">💡</span>
          <div>
            <strong className="text-white">Na prática no AOSP:</strong> Modelos convertidos para formato flatbuffers (`.tflite`) com int8 utilizam kernels otimizados da biblioteca XNNPACK e delegam tensores para a NPU via driver Android NNAPI.
          </div>
        </div>
      </div>
    </div>
  );
};
