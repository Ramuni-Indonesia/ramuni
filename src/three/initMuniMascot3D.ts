import * as THREE from 'three';
import { createMuniMascotLights, createMuniMascotModel } from './createMuniMascotModel';

export type MuniMascot3DController = {
  destroy: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function initMuniMascot3D(host: HTMLElement): MuniMascot3DController | undefined {
  if (host.dataset.modelReady === 'true') return;

  const canvas = host.querySelector('canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionQuery.matches;
  const allowsInteraction = host.dataset.interactive !== 'false';
  let destroyed = false;
  let active = true;
  let visible = !document.hidden;
  let dragging = false;
  let pointerId: number | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let targetPitch = -0.035;
  let targetYaw = -0.26;
  let elapsed = 0;
  let lastFrame = performance.now();

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
  } catch {
    host.dataset.modelState = 'fallback';
    delete host.dataset.modelReady;
    return;
  }

  host.dataset.modelReady = 'true';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
  camera.position.set(0, 0.02, 5.45);
  camera.lookAt(0, 0.06, 0);

  scene.add(createMuniMascotLights());
  const mascot = createMuniMascotModel();
  scene.add(mascot.root);

  const shadowGeometry = new THREE.CircleGeometry(0.82, 32);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x0b3045,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.name = 'Muni contact shadow';
  shadow.position.set(0, -1.56, -0.14);
  shadow.scale.set(1, 0.24, 1);
  scene.add(shadow);

  const renderScene = () => {
    renderer.render(scene, camera);
    if (host.dataset.modelState !== 'ready') host.dataset.modelState = 'ready';
  };

  const resize = () => {
    if (destroyed) return;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const halfFovTangent = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
    const distanceForHeight = 3.68 / (2 * halfFovTangent);
    const distanceForWidth = 2.5 / (2 * halfFovTangent * camera.aspect);
    camera.position.z = Math.max(distanceForHeight, distanceForWidth);
    camera.updateProjectionMatrix();
    renderScene();
  };

  const animate = (time: number) => {
    if (destroyed) return;
    const delta = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    elapsed += delta;

    if (!dragging) targetYaw += delta * 0.115;
    if (Math.abs(targetYaw) > Math.PI * 8) {
      targetYaw %= Math.PI * 2;
      mascot.root.rotation.y %= Math.PI * 2;
    }
    const damping = 1 - Math.exp(-delta * 8.2);
    mascot.root.rotation.x += (targetPitch - mascot.root.rotation.x) * damping;
    mascot.root.rotation.y += (targetYaw - mascot.root.rotation.y) * damping;
    mascot.root.position.y = Math.sin(elapsed * 1.05) * 0.025;
    shadow.scale.x = 1 - Math.sin(elapsed * 1.05) * 0.035;
    shadow.material.opacity = 0.13 - Math.sin(elapsed * 1.05) * 0.012;
    renderScene();
  };

  const syncLoop = () => {
    renderer.setAnimationLoop(!destroyed && active && visible && !reducedMotion ? animate : null);
    if (!destroyed && (!active || !visible || reducedMotion)) renderScene();
  };

  const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
  resizeObserver?.observe(host);

  const viewObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver((entries) => {
    active = entries[0]?.isIntersecting ?? false;
    lastFrame = performance.now();
    syncLoop();
  }, { rootMargin: '180px 0px' });
  viewObserver?.observe(host);

  const onWindowResize = () => resize();
  if (!resizeObserver) window.addEventListener('resize', onWindowResize, { passive: true });

  const onVisibilityChange = () => {
    visible = !document.hidden;
    lastFrame = performance.now();
    syncLoop();
  };

  const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
    if (reducedMotion) finishDrag();
    lastFrame = performance.now();
    syncLoop();
  };

  const finishDrag = () => {
    if (!dragging) return;
    dragging = false;
    host.dataset.dragging = 'false';
    if (pointerId !== null && canvas.hasPointerCapture(pointerId)) {
      try {
        canvas.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture may already be gone after a system gesture.
      }
    }
    pointerId = null;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (!allowsInteraction || reducedMotion || event.button !== 0) return;
    dragging = true;
    pointerId = event.pointerId;
    pointerX = event.clientX;
    pointerY = event.clientY;
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      dragging = false;
      pointerId = null;
      return;
    }
    host.dataset.dragging = 'true';
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return;
    const deltaX = event.clientX - pointerX;
    const deltaY = event.clientY - pointerY;
    pointerX = event.clientX;
    pointerY = event.clientY;
    targetYaw += deltaX * 0.009;
    targetPitch = clamp(targetPitch + deltaY * 0.006, -0.28, 0.22);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerId === pointerId) finishDrag();
  };

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    renderer.setAnimationLoop(null);
    resizeObserver?.disconnect();
    viewObserver?.disconnect();
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    motionQuery.removeEventListener('change', onMotionPreferenceChange);
    window.removeEventListener('pagehide', destroy);
    document.removeEventListener('astro:before-swap', destroy);
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    finishDrag();

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      geometries.add(object.geometry);
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
      objectMaterials.forEach((objectMaterial) => materials.add(objectMaterial));
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((objectMaterial) => objectMaterial.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    delete host.dataset.modelReady;
    if (host.isConnected) host.dataset.modelState = 'fallback';
  };

  const onContextLost = (event: Event) => {
    event.preventDefault();
    host.dataset.modelState = 'fallback';
    destroy();
  };

  document.addEventListener('visibilitychange', onVisibilityChange);
  motionQuery.addEventListener('change', onMotionPreferenceChange);
  window.addEventListener('pagehide', destroy, { once: true });
  document.addEventListener('astro:before-swap', destroy, { once: true });
  canvas.addEventListener('webglcontextlost', onContextLost, { once: true });
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  resize();
  syncLoop();

  return { destroy };
}
