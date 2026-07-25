import * as THREE from 'three';
import { createRamuniMarkLights, createRamuniMarkModel } from './createRamuniMarkModel';

export function initRamuniMark3D(host: HTMLElement) {
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
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0.18, 0.06, 4.4);
  scene.add(createRamuniMarkLights());
  const model = createRamuniMarkModel();
  scene.add(model.root);

  const groundGeometry = new THREE.PlaneGeometry(4.5, 4.5);
  const groundMaterial = new THREE.ShadowMaterial({ color: 0x0b3045, opacity: 0.16 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.25;
  ground.receiveShadow = true;
  scene.add(ground);

  let active = true;
  let targetX = -0.12;
  let targetY = -0.18;
  let scrollProgress = 0;
  let elapsed = 0;
  let lastFrame = performance.now();

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
    model.root.rotation.x += (targetX - model.root.rotation.x) * 0.05;
    model.root.rotation.y += (targetY - model.root.rotation.y) * 0.05;
    model.root.position.y = Math.sin(elapsed * 1.1) * 0.024 + (scrollProgress - 0.5) * 0.08;
    renderer.render(scene, camera);
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
    targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
    targetX = -((event.clientY - rect.top) / rect.height - 0.5) * 0.38;
  };
  const onPointerLeave = () => {
    targetX = -0.16 + scrollProgress * 0.16;
    targetY = -0.42 + scrollProgress * 0.82;
  };
  const updateScrollPose = (event: Event) => {
    if (reducedMotion || !(event instanceof CustomEvent)) return;
    scrollProgress = Math.min(1, Math.max(0, Number(event.detail?.progress) || 0));
    targetY = -0.42 + scrollProgress * 0.82;
    targetX = -0.16 + scrollProgress * 0.16;
  };
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);
  host.addEventListener('ramuni-mark-scroll', updateScrollPose);

  resize();
  setLoop();
  window.addEventListener('pagehide', () => {
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    viewObserver.disconnect();
    host.removeEventListener('pointermove', onPointerMove);
    host.removeEventListener('pointerleave', onPointerLeave);
    host.removeEventListener('ramuni-mark-scroll', updateScrollPose);
    model.navyRibbon.geometry.dispose();
    model.tealRibbon.geometry.dispose();
    model.navyRibbon.material.dispose();
    model.tealRibbon.material.dispose();
    groundGeometry.dispose();
    groundMaterial.dispose();
    renderer.dispose();
  }, { once: true });
}
