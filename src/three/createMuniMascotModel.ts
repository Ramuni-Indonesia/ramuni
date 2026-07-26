import * as THREE from 'three';

export type MuniMascotRuntime = {
  root: THREE.Group;
  meshes: THREE.Mesh[];
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
  root.name = 'Muni si Manyar procedural mascot';

  const ink = material(COLORS.ink, 0.62);
  const teal = material(COLORS.teal, 0.64);
  const yellow = material(COLORS.yellow, 0.66);
  const rice = material(COLORS.rice, 0.78);
  const white = material(COLORS.white, 0.74);
  const meshes: THREE.Mesh[] = [];

  const addMesh = (
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
    root.add(mesh);
    meshes.push(mesh);
    return mesh;
  };

  const bodyGeometry = new THREE.SphereGeometry(0.82, 28, 20);
  const featureGeometry = new THREE.SphereGeometry(0.5, 24, 16);
  const detailGeometry = new THREE.SphereGeometry(0.12, 18, 12);

  addMesh('Navy body', bodyGeometry, ink, [0, -0.12, 0], [0.88, 1.3, 0.74]);
  addMesh('Rice breast', featureGeometry, rice, [0, -0.16, 0.59], [1.23, 1.78, 0.25]);
  addMesh('Yellow head', bodyGeometry, yellow, [0, 0.97, 0.05], [0.82, 0.82, 0.78]);
  addMesh('Navy crown', featureGeometry, ink, [0, 1.34, -0.08], [1.2, 0.68, 1.12]);

  addMesh('Left eye white', detailGeometry, white, [-0.25, 1.1, 0.65], [1.08, 1.22, 0.55]);
  addMesh('Right eye white', detailGeometry, white, [0.25, 1.1, 0.65], [1.08, 1.22, 0.55]);
  addMesh('Left pupil', detailGeometry, ink, [-0.23, 1.1, 0.72], [0.48, 0.62, 0.34]);
  addMesh('Right pupil', detailGeometry, ink, [0.27, 1.1, 0.72], [0.48, 0.62, 0.34]);
  addMesh('Left eye glint', detailGeometry, white, [-0.21, 1.14, 0.745], [0.13, 0.16, 0.12]);
  addMesh('Right eye glint', detailGeometry, white, [0.29, 1.14, 0.745], [0.13, 0.16, 0.12]);

  const beakGeometry = new THREE.ConeGeometry(0.2, 0.44, 4, 1);
  addMesh('Upper beak', beakGeometry, ink, [0, 0.91, 0.78], [1, 1, 0.74], [Math.PI / 2, 0, Math.PI / 4]);
  addMesh('Lower beak', beakGeometry.clone(), ink, [0, 0.82, 0.74], [0.82, 0.78, 0.58], [Math.PI / 2, 0, Math.PI / 4]);

  addMesh('Raised left wing', featureGeometry, ink, [-0.68, 0.11, -0.02], [0.5, 1.5, 0.34], [0.04, -0.08, 0.5]);
  addMesh('Right wing', featureGeometry, ink, [0.67, -0.12, 0.03], [0.5, 1.45, 0.36], [-0.04, 0.08, -0.2]);
  addMesh('Left wing yellow feather', featureGeometry, yellow, [-0.78, -0.02, 0.14], [0.2, 0.92, 0.12], [0.08, -0.08, 0.52]);
  addMesh('Left wing teal feather', featureGeometry, teal, [-0.72, -0.19, 0.17], [0.17, 0.78, 0.11], [0.1, -0.08, 0.62]);
  addMesh('Right wing yellow feather', featureGeometry, yellow, [0.71, -0.31, 0.22], [0.18, 0.82, 0.11], [-0.04, 0.08, -0.18]);
  addMesh('Right wing teal feather', featureGeometry, teal, [0.6, -0.42, 0.24], [0.15, 0.62, 0.1], [-0.04, 0.08, -0.28]);

  addMesh('Navy tail feather', featureGeometry, ink, [0.22, -1.15, -0.18], [0.2, 0.9, 0.14], [0.18, 0, -0.31]);
  addMesh('Yellow tail feather', featureGeometry, yellow, [0.43, -1.06, -0.22], [0.17, 0.78, 0.12], [0.12, 0, -0.55]);
  addMesh('Teal tail feather', featureGeometry, teal, [0.6, -0.91, -0.28], [0.15, 0.68, 0.1], [0.08, 0, -0.82]);

  const legGeometry = new THREE.CylinderGeometry(0.035, 0.045, 0.5, 12);
  addMesh('Left leg', legGeometry, ink, [-0.25, -1.2, 0.12], [1, 1, 1], [0, 0, -0.1]);
  addMesh('Right leg', legGeometry.clone(), ink, [0.25, -1.2, 0.12], [1, 1, 1], [0, 0, 0.1]);

  const toeGeometry = new THREE.CylinderGeometry(0.025, 0.018, 0.33, 10);
  ([-1, 1] as const).forEach((side) => {
    const footX = side * 0.27;
    addMesh(`${side < 0 ? 'Left' : 'Right'} inner toe`, toeGeometry.clone(), ink, [footX - side * 0.08, -1.48, 0.26], [1, 1, 1], [Math.PI / 2, 0, side * 0.42]);
    addMesh(`${side < 0 ? 'Left' : 'Right'} center toe`, toeGeometry.clone(), ink, [footX, -1.48, 0.29], [1, 1, 1], [Math.PI / 2, 0, 0]);
    addMesh(`${side < 0 ? 'Left' : 'Right'} outer toe`, toeGeometry.clone(), ink, [footX + side * 0.08, -1.48, 0.26], [1, 1, 1], [Math.PI / 2, 0, -side * 0.42]);
  });

  root.rotation.set(-0.035, -0.26, 0);
  root.userData.mascotRuntime = {
    character: 'Muni si Manyar',
    construction: 'procedural-primitives',
    identityAsset: false,
    officialLogoEmbedded: false,
    palette: ['ink-navy', 'ramu-teal', 'turmeric-yellow', 'warm-rice'],
  };

  return { root, meshes };
}

export function createMuniMascotLights() {
  const lights = new THREE.Group();
  lights.name = 'Muni studio lights';

  const hemisphere = new THREE.HemisphereLight(COLORS.white, COLORS.ink, 1.65);
  const key = new THREE.DirectionalLight(0xfff5df, 3.1);
  key.position.set(-3.4, 4.6, 5.4);
  const fill = new THREE.DirectionalLight(COLORS.teal, 1.15);
  fill.position.set(4.2, 1.8, 2.6);
  const rim = new THREE.DirectionalLight(COLORS.yellow, 1.25);
  rim.position.set(2.2, 3.1, -4.2);

  lights.add(hemisphere, key, fill, rim);
  return lights;
}
