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
  let pointerYaw = 0;
  let pointerPitch = 0;
  let dragYaw = 0;
  let dragPitch = 0;
  let scrollYaw = 0;
  let scrollPitch = 0;
  let scrollLift = 0;
  let scrollFrame = 0;
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

  const shadowGeometry = new THREE.CircleGeometry(0.84, 36);
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

  const updateScrollState = () => {
    scrollFrame = 0;
    if (destroyed || !active) return;
    const bounds = host.getBoundingClientRect();
    const viewportHeight = Math.max(1, window.innerHeight);
    const progress = clamp((viewportHeight - bounds.top) / (viewportHeight + bounds.height), 0, 1);
    const centered = progress - 0.5;
    scrollYaw = centered * 0.66;
    scrollPitch = centered * -0.14;
    scrollLift = Math.sin(progress * Math.PI) * 0.08;
    host.style.setProperty('--muni-scroll-progress', progress.toFixed(3));
  };

  const requestScrollUpdate = () => {
    if (scrollFrame || destroyed) return;
    scrollFrame = requestAnimationFrame(updateScrollState);
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
    updateScrollState();
    renderScene();
  };

  const animate = (time: number) => {
    if (destroyed) return;
    const delta = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    elapsed += delta;

    const idleYaw = Math.sin(elapsed * 0.48) * 0.085;
    const idlePitch = Math.sin(elapsed * 0.72) * 0.018;
    const targetYaw = -0.26 + scrollYaw + pointerYaw + dragYaw + idleYaw;
    const targetPitch = -0.035 + scrollPitch + pointerPitch + dragPitch + idlePitch;
    const damping = 1 - Math.exp(-delta * 7.6);
    mascot.root.rotation.x += (targetPitch - mascot.root.rotation.x) * damping;
    mascot.root.rotation.y += (targetYaw - mascot.root.rotation.y) * damping;

    const breathe = Math.sin(elapsed * 1.65);
    const float = Math.sin(elapsed * 1.08);
    mascot.root.position.y = float * 0.035 + scrollLift;
    mascot.parts.body.scale.set(1 - breathe * 0.008, 1 + breathe * 0.014, 1 - breathe * 0.008);
    mascot.parts.head.rotation.x = Math.sin(elapsed * 0.92) * 0.025;
    mascot.parts.head.rotation.z = Math.sin(elapsed * 0.66) * 0.032;
    mascot.parts.leftWing.rotation.z = 0.46 + Math.sin(elapsed * 1.28) * 0.085;
    mascot.parts.rightWing.rotation.z = -0.2 - Math.sin(elapsed * 1.28 + 0.7) * 0.06;
    mascot.parts.tail.rotation.z = Math.sin(elapsed * 0.88) * 0.055;
    mascot.parts.feet.rotation.z = Math.sin(elapsed * 0.82) * 0.012;

    const blinkPhase = elapsed % 4.7;
    const blink = blinkPhase > 4.5 ? Math.max(0.08, 1 - Math.sin(((blinkPhase - 4.5) / 0.2) * Math.PI) * 0.92) : 1;
    mascot.parts.eyes.scale.y += (blink - mascot.parts.eyes.scale.y) * Math.min(1, delta * 34);
    const pupilX = clamp(pointerYaw * 0.16 + scrollYaw * 0.04, -0.035, 0.035);
    const pupilY = clamp(-pointerPitch * 0.12, -0.02, 0.02);
    mascot.parts.leftPupil.position.x = -0.23 + pupilX;
    mascot.parts.rightPupil.position.x = 0.27 + pupilX;
    mascot.parts.leftPupil.position.y = -0.01 + pupilY;
    mascot.parts.rightPupil.position.y = -0.01 + pupilY;

    shadow.scale.x = 1 - float * 0.045;
    shadowMaterial.opacity = 0.13 - float * 0.015 - scrollLift * 0.1;
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
    if (active) updateScrollState();
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

  const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
    if (reducedMotion) finishDrag();
    lastFrame = performance.now();
    syncLoop();
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
    if (!allowsInteraction || reducedMotion) return;
    if (dragging && event.pointerId === pointerId) {
      const deltaX = event.clientX - pointerX;
      const deltaY = event.clientY - pointerY;
      pointerX = event.clientX;
      pointerY = event.clientY;
      dragYaw = clamp(dragYaw + deltaX * 0.008, -1.2, 1.2);
      dragPitch = clamp(dragPitch + deltaY * 0.005, -0.22, 0.18);
      return;
    }
    const bounds = host.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5, -0.5, 0.5);
    const y = clamp((event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5, -0.5, 0.5);
    pointerYaw = x * 0.34;
    pointerPitch = y * 0.14;
  };

  const onPointerLeave = () => {
    if (dragging) return;
    pointerYaw = 0;
    pointerPitch = 0;
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
    window.removeEventListener('scroll', requestScrollUpdate);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    motionQuery.removeEventListener('change', onMotionPreferenceChange);
    window.removeEventListener('pagehide', destroy);
    document.removeEventListener('astro:before-swap', destroy);
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', onPointerLeave);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
    canvas.removeEventListener('lostpointercapture', finishDrag);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
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
    host.style.removeProperty('--muni-scroll-progress');
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
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('pagehide', destroy, { once: true });
  document.addEventListener('astro:before-swap', destroy, { once: true });
  canvas.addEventListener('webglcontextlost', onContextLost, { once: true });
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('lostpointercapture', finishDrag);

  resize();
  updateScrollState();
  syncLoop();

  return { destroy };
}
