import * as THREE from 'three';
import { createDecisionFlowLights, createDecisionFlowSculpture } from './createDecisionFlowSculpture';

export function initDecisionFlow3D(host: HTMLElement) {
  if (host.dataset.modelReady === 'true') return;
  const canvas = host.querySelector('canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  host.dataset.modelReady = 'true';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0.16, 0.08, 4.7);
  scene.add(createDecisionFlowLights());
  const sculpture = createDecisionFlowSculpture();
  scene.add(sculpture.root);

  const groundGeometry = new THREE.PlaneGeometry(4.5, 4.5);
  const groundMaterial = new THREE.ShadowMaterial({ color: 0x0b3045, opacity: 0.14 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.3;
  ground.receiveShadow = true;
  scene.add(ground);

  let active = true;
  let targetX = -0.1;
  let targetY = -0.18;
  let scrollProgress = 0;
  let elapsed = 0;
  let lastFrame = performance.now();
  let firstFrame = true;
  let destroyed = false;

  const resize = () => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };

  const render = (time = performance.now()) => {
    const delta = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    elapsed += delta;
    const damping = 1 - Math.exp(-delta * 7.5);
    sculpture.root.rotation.x += (targetX - sculpture.root.rotation.x) * damping;
    sculpture.root.rotation.y += (targetY - sculpture.root.rotation.y) * damping;
    sculpture.root.position.y = Math.sin(elapsed * 0.9) * 0.018 + (scrollProgress - 0.5) * 0.08;
    sculpture.meshes.slice(0, 3).forEach((mesh, index) => {
      mesh.position.z = (-0.08 + index * 0.11) + scrollProgress * index * 0.055;
    });
    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      host.dataset.modelState = 'ready';
    }
  };

  const setLoop = () => renderer.setAnimationLoop(active && !reducedMotion ? render : null);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const viewObserver = new IntersectionObserver((entries) => {
    active = entries[0]?.isIntersecting ?? false;
    setLoop();
    if (active) renderer.render(scene, camera);
  }, { rootMargin: '180px' });
  viewObserver.observe(host);

  const onPointerMove = (event: PointerEvent) => {
    if (reducedMotion) return;
    const rect = host.getBoundingClientRect();
    targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.62;
    targetX = -((event.clientY - rect.top) / rect.height - 0.5) * 0.34;
  };
  const onPointerLeave = () => {
    targetX = -0.14 + scrollProgress * 0.12;
    targetY = -0.38 + scrollProgress * 0.72;
  };
  const updateScrollPose = (event: Event) => {
    if (reducedMotion || !(event instanceof CustomEvent)) return;
    scrollProgress = Math.min(1, Math.max(0, Number(event.detail?.progress) || 0));
    targetY = -0.38 + scrollProgress * 0.72;
    targetX = -0.14 + scrollProgress * 0.12;
  };
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);
  host.addEventListener('decision-flow-scroll', updateScrollPose);

  resize();
  if (reducedMotion) render();
  else setLoop();

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    viewObserver.disconnect();
    host.removeEventListener('pointermove', onPointerMove);
    host.removeEventListener('pointerleave', onPointerLeave);
    host.removeEventListener('decision-flow-scroll', updateScrollPose);
    sculpture.meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => material.dispose());
    });
    groundGeometry.dispose();
    groundMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    delete host.dataset.modelReady;
  };

  window.addEventListener('pagehide', destroy, { once: true });
  document.addEventListener('astro:before-swap', destroy, { once: true });
}
