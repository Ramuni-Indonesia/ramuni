import * as THREE from 'three';
import { createMuniMascotLights, createMuniMascotModel } from './createMuniMascotModel';

export type MuniMascot3DController = {
  destroy: () => void;
};

type MuniPose = {
  name: string;
  rootYaw: number;
  rootPitch: number;
  rootRoll: number;
  rootLift: number;
  headYaw: number;
  headPitch: number;
  headRoll: number;
  leftWing: number;
  rightWing: number;
  leftForeWing: number;
  rightForeWing: number;
  leftTip: number;
  rightTip: number;
  tail: number;
};

type MascotFocusDetail = {
  index?: number;
  targetX?: number;
  targetY?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const damp = (current: number, target: number, speed: number, delta: number) => (
  THREE.MathUtils.damp(current, target, speed, delta)
);

const NEUTRAL_POSE: MuniPose = {
  name: 'welcome',
  rootYaw: -0.1,
  rootPitch: -0.02,
  rootRoll: 0,
  rootLift: 0,
  headYaw: 0,
  headPitch: 0,
  headRoll: -0.025,
  leftWing: -0.24,
  rightWing: 0.24,
  leftForeWing: 0,
  rightForeWing: 0,
  leftTip: -0.06,
  rightTip: 0.06,
  tail: 0,
};

const CARD_POSES: readonly MuniPose[] = [
  {
    ...NEUTRAL_POSE,
    name: 'point-left-high',
    rootYaw: -0.18,
    rootRoll: 0.025,
    rootLift: 0.035,
    headYaw: -0.2,
    headPitch: -0.06,
    headRoll: -0.08,
    leftWing: -2.12,
    leftForeWing: 0.16,
    leftTip: -0.2,
    rightWing: 0.18,
    tail: 0.07,
  },
  {
    ...NEUTRAL_POSE,
    name: 'point-right-high',
    rootYaw: 0.13,
    rootRoll: -0.02,
    rootLift: 0.045,
    headYaw: 0.22,
    headPitch: -0.07,
    headRoll: 0.07,
    rightWing: 2.12,
    rightForeWing: -0.16,
    rightTip: 0.2,
    leftWing: -0.18,
    tail: -0.07,
  },
  {
    ...NEUTRAL_POSE,
    name: 'present-right',
    rootYaw: 0.16,
    rootRoll: -0.018,
    headYaw: 0.24,
    headRoll: 0.045,
    rightWing: 1.52,
    rightForeWing: -0.12,
    rightTip: 0.18,
    leftWing: -0.16,
    tail: -0.05,
  },
  {
    ...NEUTRAL_POSE,
    name: 'present-right-low',
    rootYaw: 0.12,
    rootPitch: 0.025,
    rootRoll: -0.03,
    rootLift: -0.015,
    headYaw: 0.2,
    headPitch: 0.1,
    headRoll: 0.05,
    rightWing: 0.92,
    rightForeWing: -0.08,
    rightTip: 0.14,
    leftWing: -0.18,
    tail: -0.045,
  },
  {
    ...NEUTRAL_POSE,
    name: 'present-left-low',
    rootYaw: -0.16,
    rootPitch: 0.02,
    rootRoll: 0.03,
    rootLift: -0.01,
    headYaw: -0.22,
    headPitch: 0.09,
    headRoll: -0.055,
    leftWing: -0.94,
    leftForeWing: 0.08,
    leftTip: -0.14,
    rightWing: 0.18,
    tail: 0.05,
  },
];

const createFocusPose = (index: number, targetX: number, targetY: number): MuniPose => {
  const basePose = CARD_POSES[index] ?? NEUTRAL_POSE;
  const horizontal = clamp(targetX, -1, 1);
  const vertical = clamp(targetY, -1, 1);
  if (Math.abs(horizontal) < 0.14) return basePose;

  const side = horizontal < 0 ? -1 : 1;
  const reach = vertical < -0.2 ? 2.12 : vertical > 0.22 ? 0.92 : 1.5;
  return {
    ...basePose,
    name: `card-${index + 1}-${side < 0 ? 'left' : 'right'}-${vertical < -0.2 ? 'high' : vertical > 0.22 ? 'low' : 'middle'}`,
    rootYaw: horizontal * 0.16,
    rootPitch: vertical * 0.035,
    rootRoll: horizontal * -0.025,
    headYaw: horizontal * 0.24,
    headPitch: vertical * 0.12,
    headRoll: horizontal * 0.08,
    leftWing: side < 0 ? -reach : -0.18,
    rightWing: side > 0 ? reach : 0.18,
    leftForeWing: side < 0 ? 0.12 : 0,
    rightForeWing: side > 0 ? -0.12 : 0,
    leftTip: side < 0 ? -0.18 : -0.04,
    rightTip: side > 0 ? 0.18 : 0.04,
    tail: horizontal * -0.3,
  };
};

export function initMuniMascot3D(host: HTMLElement): MuniMascot3DController | undefined {
  if (host.dataset.modelReady === 'true') return;

  const canvas = host.querySelector('canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionQuery.matches;
  const allowsInteraction = host.dataset.interactive !== 'false';
  const focusTarget = host.closest<HTMLElement>('[data-problem-mascot]') ?? host;
  let destroyed = false;
  let active = true;
  let visible = !document.hidden;
  let pointerYaw = 0;
  let pointerPitch = 0;
  let focusX = 0;
  let focusY = 0;
  let scrollTurn = 0;
  let scrollPitch = 0;
  let scrollLift = 0;
  let scrollFrame = 0;
  let poseIndex = -1;
  let poseAge = 10;
  let targetPose = NEUTRAL_POSE;
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
  renderer.toneMappingExposure = 0.94;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
  camera.position.set(0, 0.08, 6.15);
  camera.lookAt(0, 0.03, 0);

  scene.add(createMuniMascotLights());
  const mascot = createMuniMascotModel();
  mascot.root.scale.setScalar(1.08);
  scene.add(mascot.root);

  const shadowGeometry = new THREE.CircleGeometry(0.78, 36);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x0b3045,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.name = 'Muni soft contact shadow';
  shadow.position.set(0, -1.48, -0.18);
  shadow.scale.set(1, 0.2, 1);
  scene.add(shadow);

  const renderScene = () => {
    renderer.render(scene, camera);
    if (host.dataset.modelState !== 'ready') host.dataset.modelState = 'ready';
  };

  const applyFocus = (index: number, targetX = 0, targetY = 0) => {
    const nextIndex = clamp(Math.round(index), 0, CARD_POSES.length - 1);
    const nextFocusX = clamp(targetX, -1, 1);
    const nextFocusY = clamp(targetY, -1, 1);
    const focusChanged = Math.abs(nextFocusX - focusX) > 0.08 || Math.abs(nextFocusY - focusY) > 0.08;
    if (nextIndex !== poseIndex || focusChanged) {
      poseIndex = nextIndex;
      poseAge = 0;
      targetPose = createFocusPose(nextIndex, nextFocusX, nextFocusY);
      host.dataset.mascotPose = targetPose.name;
    }
    focusX = nextFocusX;
    focusY = nextFocusY;
  };

  const onMascotFocus = (event: Event) => {
    const detail = (event as CustomEvent<MascotFocusDetail>).detail;
    if (!detail || typeof detail.index !== 'number') return;
    applyFocus(detail.index, detail.targetX, detail.targetY);
  };

  const initialFocus = Number(focusTarget.dataset.activeProblem);
  const initialTargetX = Number(focusTarget.dataset.mascotTargetX);
  const initialTargetY = Number(focusTarget.dataset.mascotTargetY);
  if (Number.isFinite(initialFocus)) {
    applyFocus(
      initialFocus,
      Number.isFinite(initialTargetX) ? initialTargetX : 0,
      Number.isFinite(initialTargetY) ? initialTargetY : 0,
    );
  }

  const updateScrollState = () => {
    scrollFrame = 0;
    if (destroyed || !active) return;
    const bounds = host.getBoundingClientRect();
    const viewportHeight = Math.max(1, window.innerHeight);
    const progress = clamp((viewportHeight - bounds.top) / (viewportHeight + bounds.height), 0, 1);
    const centered = progress - 0.5;
    scrollTurn = centered * 0.1;
    scrollPitch = centered * -0.035;
    scrollLift = Math.sin(progress * Math.PI) * 0.04;
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
    camera.updateProjectionMatrix();
    updateScrollState();
    renderScene();
  };

  const animate = (time: number) => {
    if (destroyed) return;
    const delta = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    elapsed += delta;
    poseAge += delta;

    const breathe = Math.sin(elapsed * 1.48);
    const float = Math.sin(elapsed * 0.9);
    const settledGesture = clamp(poseAge / 0.72, 0, 1);
    const gestureEase = 1 - Math.pow(1 - settledGesture, 3);
    const pointingWave = gestureEase * Math.sin(elapsed * 1.7) * 0.022;
    const idleYaw = Math.sin(elapsed * 0.42) * 0.018;
    const idleHead = Math.sin(elapsed * 0.64) * 0.02;
    const rigDamping = 6.8;
    const rootDamping = 5.6;

    const rootYaw = targetPose.rootYaw + scrollTurn + pointerYaw + idleYaw;
    const rootPitchTarget = targetPose.rootPitch + scrollPitch + pointerPitch;
    mascot.root.rotation.x = damp(mascot.root.rotation.x, rootPitchTarget, rootDamping, delta);
    mascot.root.rotation.y = damp(mascot.root.rotation.y, rootYaw, rootDamping, delta);
    mascot.root.rotation.z = damp(mascot.root.rotation.z, targetPose.rootRoll, rootDamping, delta);
    mascot.root.position.y = damp(
      mascot.root.position.y,
      targetPose.rootLift + scrollLift + float * 0.022,
      5.2,
      delta,
    );

    mascot.parts.body.scale.x = damp(mascot.parts.body.scale.x, 1 - breathe * 0.006, 5.5, delta);
    mascot.parts.body.scale.y = damp(mascot.parts.body.scale.y, 1 + breathe * 0.011, 5.5, delta);
    mascot.parts.body.scale.z = damp(mascot.parts.body.scale.z, 1 - breathe * 0.006, 5.5, delta);

    mascot.parts.head.rotation.x = damp(
      mascot.parts.head.rotation.x,
      targetPose.headPitch + focusY * -0.055 + idleHead * 0.35,
      rigDamping,
      delta,
    );
    mascot.parts.head.rotation.y = damp(
      mascot.parts.head.rotation.y,
      targetPose.headYaw + focusX * 0.11,
      rigDamping,
      delta,
    );
    mascot.parts.head.rotation.z = damp(
      mascot.parts.head.rotation.z,
      targetPose.headRoll + idleHead,
      rigDamping,
      delta,
    );

    const pointsLeft = targetPose.leftWing < -0.7;
    const pointsRight = targetPose.rightWing > 0.7;
    mascot.parts.leftWing.root.rotation.z = damp(
      mascot.parts.leftWing.root.rotation.z,
      targetPose.leftWing + (pointsLeft ? -pointingWave : 0),
      rigDamping,
      delta,
    );
    mascot.parts.rightWing.root.rotation.z = damp(
      mascot.parts.rightWing.root.rotation.z,
      targetPose.rightWing + (pointsRight ? pointingWave : 0),
      rigDamping,
      delta,
    );
    mascot.parts.leftWing.foreWing.rotation.z = damp(
      mascot.parts.leftWing.foreWing.rotation.z,
      targetPose.leftForeWing,
      rigDamping,
      delta,
    );
    mascot.parts.rightWing.foreWing.rotation.z = damp(
      mascot.parts.rightWing.foreWing.rotation.z,
      targetPose.rightForeWing,
      rigDamping,
      delta,
    );
    mascot.parts.leftWing.tip.rotation.z = damp(
      mascot.parts.leftWing.tip.rotation.z,
      targetPose.leftTip,
      rigDamping,
      delta,
    );
    mascot.parts.rightWing.tip.rotation.z = damp(
      mascot.parts.rightWing.tip.rotation.z,
      targetPose.rightTip,
      rigDamping,
      delta,
    );
    mascot.parts.tail.rotation.z = damp(
      mascot.parts.tail.rotation.z,
      targetPose.tail + Math.sin(elapsed * 0.78) * 0.035,
      5.2,
      delta,
    );
    mascot.parts.feet.rotation.z = damp(
      mascot.parts.feet.rotation.z,
      Math.sin(elapsed * 0.7) * 0.006,
      5,
      delta,
    );

    const blinkPhase = elapsed % 6.1;
    let blink = 1;
    if (blinkPhase > 5.72 && blinkPhase < 5.88) {
      blink = Math.max(0.1, 1 - Math.sin(((blinkPhase - 5.72) / 0.16) * Math.PI) * 0.92);
    } else if (blinkPhase > 5.96) {
      blink = Math.max(0.16, 1 - Math.sin(((blinkPhase - 5.96) / 0.14) * Math.PI) * 0.86);
    }
    mascot.parts.eyes.scale.y = damp(mascot.parts.eyes.scale.y, blink, 28, delta);

    const pupilX = clamp(focusX * 0.035 + pointerYaw * 0.13, -0.045, 0.045);
    const pupilY = clamp(focusY * -0.022 - pointerPitch * 0.18, -0.027, 0.027);
    mascot.parts.leftPupil.position.x = -0.22 + pupilX;
    mascot.parts.rightPupil.position.x = 0.24 + pupilX;
    mascot.parts.leftPupil.position.y = -0.005 + pupilY;
    mascot.parts.rightPupil.position.y = -0.005 + pupilY;

    const greeting = poseAge < 0.5 ? Math.sin((poseAge / 0.5) * Math.PI) : 0;
    mascot.parts.beakLower.rotation.x = damp(
      mascot.parts.beakLower.rotation.x,
      -0.08 - greeting * 0.07,
      10,
      delta,
    );
    mascot.parts.beakUpper.rotation.x = damp(mascot.parts.beakUpper.rotation.x, 0.03, 10, delta);

    shadow.scale.x = 1 - float * 0.035 - Math.abs(targetPose.rootLift) * 0.08;
    shadowMaterial.opacity = clamp(0.1 - float * 0.01 - scrollLift * 0.08, 0.065, 0.12);
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

  const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
    lastFrame = performance.now();
    syncLoop();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!allowsInteraction || reducedMotion) return;
    const bounds = host.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5, -0.5, 0.5);
    const y = clamp((event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5, -0.5, 0.5);
    pointerYaw = x * 0.12;
    pointerPitch = y * 0.06;
  };

  const onPointerLeave = () => {
    pointerYaw = 0;
    pointerPitch = 0;
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
    focusTarget.removeEventListener('ramuni:mascot-focus', onMascotFocus);
    window.removeEventListener('pagehide', destroy);
    document.removeEventListener('astro:before-swap', destroy);
    host.removeEventListener('pointermove', onPointerMove);
    host.removeEventListener('pointerleave', onPointerLeave);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    if (scrollFrame) cancelAnimationFrame(scrollFrame);

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
    delete host.dataset.mascotPose;
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
  focusTarget.addEventListener('ramuni:mascot-focus', onMascotFocus);
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('pagehide', destroy, { once: true });
  document.addEventListener('astro:before-swap', destroy, { once: true });
  canvas.addEventListener('webglcontextlost', onContextLost, { once: true });
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);

  resize();
  updateScrollState();
  syncLoop();

  return { destroy };
}
