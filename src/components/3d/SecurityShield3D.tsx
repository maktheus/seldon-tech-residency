import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SECURITY_DOMAINS = [
  {
    id: 'strongbox',
    name: 'Hardware Keystore / StrongBox',
    color: 0x10b981,
    desc: 'Criptoprocessador físico independente (Secure Element / TEE) com CPU e RAM dedicadas imunes a root no Kernel.',
    status: 'Isolado em Hardware (AES-256 / RSA-4096)'
  },
  {
    id: 'selinux',
    name: 'SELinux Mandatory Access Control',
    color: 0x06b6d4,
    desc: 'Políticas restritivas de tipo (Type Enforcement) no Kernel que limitam até mesmo o que o superusuário root pode executar.',
    status: 'Modo Enforcing Ativo'
  },
  {
    id: 'sandbox',
    name: 'App Sandbox (UID Unix)',
    color: 0x8b5cf6,
    desc: 'Cada app roda com seu próprio ID de usuário Unix (u0_a124) em uma jaula de processos isolada.',
    status: 'Isolamento de Processo Ativo'
  },
  {
    id: 'avb',
    name: 'Android Verified Boot (AVB 2.0)',
    color: 0xf59e0b,
    desc: 'Cadeia de confiança de hardware que valida cryptographic hashes da partição do sistema operacional com dm-verity.',
    status: 'Cadeia de Confiança Travada (Green State)'
  }
];

export const SecurityShield3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.5, 15);
    emeraldLight.position.set(3, 4, 4);
    scene.add(emeraldLight);

    const group = new THREE.Group();
    scene.add(group);

    // Central Vault Core (StrongBox Cube with Beveled Edges)
    const vaultGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const vaultMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x064e3b,
      emissiveIntensity: 0.4
    });
    const vaultMesh = new THREE.Mesh(vaultGeo, vaultMat);
    group.add(vaultMesh);

    // Concentric Hexagonal Protective Shields
    const shield1Geo = new THREE.RingGeometry(1.6, 1.75, 6);
    const shield1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const shield1 = new THREE.Mesh(shield1Geo, shield1Mat);
    group.add(shield1);

    const shield2Geo = new THREE.RingGeometry(2.1, 2.2, 6);
    const shield2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const shield2 = new THREE.Mesh(shield2Geo, shield2Mat);
    shield2.rotation.z = Math.PI / 6;
    group.add(shield2);

    const shield3Geo = new THREE.RingGeometry(2.6, 2.7, 6);
    const shield3Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const shield3 = new THREE.Mesh(shield3Geo, shield3Mat);
    group.add(shield3);

    // Surrounding Sentinel Beacons (Verified Boot chain nodes)
    const beaconGeo = new THREE.OctahedronGeometry(0.18);
    const beaconMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.8 });
    const beacons: THREE.Mesh[] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const b = new THREE.Mesh(beaconGeo, beaconMat);
      b.position.set(Math.cos(angle) * 3.1, Math.sin(angle) * 3.1, 0);
      group.add(b);
      beacons.push(b);
    }

    // Raycaster / Drag
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.4;
    };

    container.addEventListener('mousemove', onMouseMove);

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = mouseX + Math.sin(t * 0.5) * 0.1;
      group.rotation.x = mouseY + Math.cos(t * 0.6) * 0.1;

      vaultMesh.rotation.y = t * 0.4;
      vaultMesh.rotation.x = t * 0.2;

      shield1.rotation.z = t * 0.3;
      shield2.rotation.z = -t * 0.2;
      shield3.rotation.z = t * 0.15;

      beacons.forEach((b, i) => {
        b.rotation.y = t * 2;
        b.position.z = Math.sin(t * 2 + i) * 0.3;
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
  }, []);

  const active = SECURITY_DOMAINS[selectedDomain];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-7 relative h-[420px] rounded-2xl glass-panel border border-emerald-500/30 overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-900/90 border border-emerald-500/50 rounded-full text-xs font-mono text-emerald-300">
            AOSP Security Fortress 3D • StrongBox & SELinux
          </span>
        </div>

        <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 pointer-events-none">
          Mova o cursor para inspecionar os anéis concêntricos de defesa criptográfica
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Camada de Defesa Ativa
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-[11px] font-mono text-emerald-300">
              {active.status}
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-2 font-display">
            {active.name}
          </h4>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            {active.desc}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Mecanismos de Proteção:</span>
            <div className="grid grid-cols-2 gap-2">
              {SECURITY_DOMAINS.map((domain, idx) => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(idx)}
                  className={`p-2.5 rounded-lg text-left text-xs font-mono border transition-all cursor-pointer ${
                    selectedDomain === idx
                      ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] text-emerald-400">Escudo 0{idx + 1}</div>
                  <div className="truncate">{domain.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs text-slate-300 flex items-start gap-2">
          <span className="text-emerald-400 text-base">🛡️</span>
          <div>
            <strong className="text-white">Cadeia de Confiança (Verified Boot):</strong> Na inicialização, a ROM de boot de hardware valida a chave pública do Bootloader, que valida o Kernel, que por sua vez valida a partição do sistema com `dm-verity`. Se um único byte for adulterado, o aparelho recusa a inicialização.
          </div>
        </div>
      </div>
    </div>
  );
};
