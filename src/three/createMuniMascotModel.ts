import * as THREE from 'three';

export type MuniMascotParts = {
  body: THREE.Group;
  head: THREE.Group;
  eyes: THREE.Group;
  leftPupil: THREE.Mesh;
  rightPupil: THREE.Mesh;
  leftWing: THREE.Group;
  rightWing: THREE.Group;
  tail: THREE.Group;
  feet: THREE.Group;
};

export type MuniMascotRuntime = {
  root: THREE.Group;
  meshes: THREE.Mesh[];
  parts: MuniMascotParts;
};

const COLORS = {
  ink: 0x0b3045,
  teal: 0x168c8c,
  yellow: 0xf2b134,
  rice: 0xf4f0e7,
  white: 0xffffff,
} as const;

const material = (color: number, roughness = 0.68) => new THREE.MeshStandardMaterial({
  color,
  roughness,
  metalness: 0.015,
});

export function createMuniMascotModel(): MuniMascotRuntime {
  const root = new THREE.Group();
  root.name = 'Muni si Manyar interactive 3D interpretation';

  const body = new THREE.Group();
  const head = new THREE.Group();
  const eyes = new THREE.Group();
  const leftWing = new THREE.Group();
  const rightWing = new THREE.Group();
  const tail = new THREE.Group();
  const feet = new THREE.Group();

  body.name = 'Muni body';
  head.name = 'Muni head';
  eyes.name = 'Muni eyes';
  leftWing.name = 'Muni left wing';
  rightWing.name = 'Muni right wing';
  tail.name = 'Muni tail';
  feet.name = 'Muni feet';

  root.add(body, head, leftWing, rightWing, tail, feet);
  head.add(eyes);

  const ink = material(COLORS.ink, 0.62);
  const teal = material(COLORS.teal, 0.64);
  const yellow = material(COLORS.yellow, 0.66);
  const rice = material(COLORS.rice, 0.78);
  const white = material(COLORS.white, 0.74);
  const meshes: THREE.Mesh[] = [];

  const addMesh = (
    parent: THREE.Group,
    name: string,
    geometry: THREE.BufferGeometry,
    meshMaterial: THREE.Material,
    position: [number, number, number],
    scale: [number, number, number] = [1, 1, 1],
    rotation: [number, number, number] = [0, 0, 0],
  ) => {
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    parent.add(mesh);
    meshes.push(mesh);
    return mesh;
  };

  const bodyGeometry = new THREE.SphereGeometry(0.82, 32, 24);
  const featureGeometry = new THREE.SphereGeometry(0.5, 28, 20);
  const detailGeometry = new THREE.SphereGeometry(0.12, 20, 14);

  body.position.set(0, -0.08, 0);
  addMesh(body, 'Navy body', bodyGeometry, ink, [0, 0, 0], [0.94, 1.22, 0.8]);
  addMesh(body, 'Rice breast', featureGeometry, rice, [0, -0.05, 0.64], [1.3, 1.72, 0.25]);
  addMesh(body, 'Teal breast accent', featureGeometry, teal, [0, -0.5, 0.66], [0.58, 0.34, 0.12]);

  head.position.set(0, 0.91, 0.04);
  addMesh(head, 'Yellow head', bodyGeometry, yellow, [0, 0, 0], [0.86, 0.82, 0.8]);
  addMesh(head, 'Navy crown', featureGeometry, ink, [0, 0.38, -0.11], [1.24, 0.66, 1.12]);
  addMesh(head, 'Left cheek', detailGeometry, rice, [-0.44, -0.05, 0.62], [1.42, 0.72, 0.28]);
  addMesh(head, 'Right cheek', detailGeometry, rice, [0.44, -0.05, 0.62], [1.42, 0.72, 0.28]);

  eyes.position.set(0, 0.14, 0.64);
  addMesh(eyes, 'Left eye white', detailGeometry, white, [-0.25, 0, 0], [1.12, 1.28, 0.58]);
  addMesh(eyes, 'Right eye white', detailGeometry, white, [0.25, 0, 0], [1.12, 1.28, 0.58]);
  const leftPupil = addMesh(eyes, 'Left pupil', detailGeometry, ink, [-0.23, -0.01, 0.078], [0.5, 0.66, 0.35]);
  const rightPupil = addMesh(eyes, 'Right pupil', detailGeometry, ink, [0.27, -0.01, 0.078], [0.5, 0.66, 0.35]);
  addMesh(eyes, 'Left eye glint', detailGeometry, white, [-0.21, 0.03, 0.105], [0.13, 0.16, 0.12]);
  addMesh(eyes, 'Right eye glint', detailGeometry, white, [0.29, 0.03, 0.105], [0.13, 0.16, 0.12]);

  const beakGeometry = new THREE.ConeGeometry(0.2, 0.46, 4, 1);
  addMesh(head, 'Upper beak', beakGeometry, ink, [0, -0.17, 0.8], [1, 1, 0.74], [Math.PI / 2, 0, Math.PI / 4]);
  addMesh(head, 'Lower beak', beakGeometry.clone(), ink, [0, -0.27, 0.76], [0.82, 0.78, 0.58], [Math.PI / 2, 0, Math.PI / 4]);

  leftWing.position.set(-0.64, 0.02, -0.01);
  leftWing.rotation.set(0.02, -0.06, 0.46);
  addMesh(leftWing, 'Left wing', featureGeometry, ink, [0, 0, 0], [0.52, 1.5, 0.36]);
  addMesh(leftWing, 'Left wing yellow feather', featureGeometry, yellow, [-0.1, -0.16, 0.17], [0.21, 0.94, 0.13], [0.06, -0.04, 0.04]);
  addMesh(leftWing, 'Left wing teal feather', featureGeometry, teal, [-0.03, -0.34, 0.19], [0.18, 0.8, 0.12], [0.08, -0.04, 0.12]);

  rightWing.position.set(0.65, -0.1, 0.02);
  rightWing.rotation.set(-0.03, 0.07, -0.2);
  addMesh(rightWing, 'Right wing', featureGeometry, ink, [0, 0, 0], [0.52, 1.46, 0.37]);
  addMesh(rightWing, 'Right wing yellow feather', featureGeometry, yellow, [0.04, -0.2, 0.18], [0.19, 0.84, 0.12], [-0.03, 0.04, 0.03]);
  addMesh(rightWing, 'Right wing teal feather', featureGeometry, teal, [-0.06, -0.38, 0.2], [0.16, 0.64, 0.11], [-0.03, 0.04, -0.08]);

  tail.position.set(0.2, -1.05, -0.18);
  addMesh(tail, 'Navy tail feather', featureGeometry, ink, [0, 0, 0], [0.2, 0.92, 0.15], [0.18, 0, -0.31]);
  addMesh(tail, 'Yellow tail feather', featureGeometry, yellow, [0.22, 0.08, -0.04], [0.17, 0.8, 0.13], [0.12, 0, -0.55]);
  addMesh(tail, 'Teal tail feather', featureGeometry, teal, [0.42, 0.23, -0.1], [0.15, 0.7, 0.11], [0.08, 0, -0.82]);

  feet.position.set(0, -1.17, 0.12);
  const legGeometry = new THREE.CylinderGeometry(0.035, 0.045, 0.5, 12);
  addMesh(feet, 'Left leg', legGeometry, ink, [-0.25, 0, 0], [1, 1, 1], [0, 0, -0.1]);
  addMesh(feet, 'Right leg', legGeometry.clone(), ink, [0.25, 0, 0], [1, 1, 1], [0, 0, 0.1]);

  const toeGeometry = new THREE.CylinderGeometry(0.025, 0.018, 0.33, 10);
  ([-1, 1] as const).forEach((side) => {
    const footX = side * 0.27;
    addMesh(feet, `${side < 0 ? 'Left' : 'Right'} inner toe`, toeGeometry.clone(), ink, [footX - side * 0.08, -0.28, 0.14], [1, 1, 1], [Math.PI / 2, 0, side * 0.42]);
    addMesh(feet, `${side < 0 ? 'Left' : 'Right'} center toe`, toeGeometry.clone(), ink, [footX, -0.28, 0.17], [1, 1, 1], [Math.PI / 2, 0, 0]);
    addMesh(feet, `${side < 0 ? 'Left' : 'Right'} outer toe`, toeGeometry.clone(), ink, [footX + side * 0.08, -0.28, 0.14], [1, 1, 1], [Math.PI / 2, 0, -side * 0.42]);
  });

  root.rotation.set(-0.035, -0.26, 0);
  root.userData.mascotRuntime = {
    character: 'Muni si Manyar',
    construction: 'procedural-primitives',
    identityAsset: false,
    officialLogoEmbedded: false,
    presentation: 'interactive-3d-interpretation',
    palette: ['ink-navy', 'ramu-teal', 'turmeric-yellow', 'warm-rice'],
  };

  return {
    root,
    meshes,
    parts: { body, head, eyes, leftPupil, rightPupil, leftWing, rightWing, tail, feet },
  };
}

export function createMuniMascotLights() {
  const lights = new THREE.Group();
  lights.name = 'Muni studio lights';

  const hemisphere = new THREE.HemisphereLight(COLORS.white, COLORS.ink, 1.7);
  const key = new THREE.DirectionalLight(0xfff5df, 3.15);
  key.position.set(-3.4, 4.6, 5.4);
  const fill = new THREE.DirectionalLight(COLORS.teal, 1.18);
  fill.position.set(4.2, 1.8, 2.6);
  const rim = new THREE.DirectionalLight(COLORS.yellow, 1.3);
  rim.position.set(2.2, 3.1, -4.2);

  lights.add(hemisphere, key, fill, rim);
  return lights;
}
