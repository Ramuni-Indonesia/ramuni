import * as THREE from 'three';

export type MuniWingParts = {
  root: THREE.Group;
  foreWing: THREE.Group;
  tip: THREE.Group;
};

export type MuniMascotParts = {
  body: THREE.Group;
  head: THREE.Group;
  face: THREE.Group;
  eyes: THREE.Group;
  leftPupil: THREE.Mesh;
  rightPupil: THREE.Mesh;
  beakUpper: THREE.Mesh;
  beakLower: THREE.Mesh;
  leftWing: MuniWingParts;
  rightWing: MuniWingParts;
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
  deepInk: 0x071f2c,
  teal: 0x168c8c,
  yellow: 0xf2b134,
  rice: 0xf4f0e7,
  eye: 0xfffcf4,
} as const;

const material = (color: number, roughness = 0.78) => new THREE.MeshStandardMaterial({
  color,
  roughness,
  metalness: 0,
});

export function createMuniMascotModel(): MuniMascotRuntime {
  const root = new THREE.Group();
  root.name = 'Muni si Manyar cute interactive 3D interpretation';

  const body = new THREE.Group();
  const head = new THREE.Group();
  const face = new THREE.Group();
  const eyes = new THREE.Group();
  const tail = new THREE.Group();
  const feet = new THREE.Group();

  const createWing = (name: string): MuniWingParts => {
    const wingRoot = new THREE.Group();
    const foreWing = new THREE.Group();
    const tip = new THREE.Group();
    wingRoot.name = `${name} wing root`;
    foreWing.name = `${name} fore wing`;
    tip.name = `${name} feather tip`;
    wingRoot.add(foreWing);
    foreWing.add(tip);
    return { root: wingRoot, foreWing, tip };
  };

  const leftWing = createWing('Muni left');
  const rightWing = createWing('Muni right');

  body.name = 'Muni body';
  head.name = 'Muni head';
  face.name = 'Muni face';
  eyes.name = 'Muni eyes';
  tail.name = 'Muni tail';
  feet.name = 'Muni feet';

  root.add(tail, leftWing.root, rightWing.root, feet, body, head);
  head.add(face);
  face.add(eyes);

  const ink = material(COLORS.ink, 0.74);
  const deepInk = material(COLORS.deepInk, 0.7);
  const teal = material(COLORS.teal, 0.8);
  const yellow = material(COLORS.yellow, 0.79);
  const rice = material(COLORS.rice, 0.86);
  const eye = material(COLORS.eye, 0.88);
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

  const bodyGeometry = new THREE.SphereGeometry(0.78, 32, 24);
  const softGeometry = new THREE.SphereGeometry(0.5, 28, 20);
  const eyeGeometry = new THREE.SphereGeometry(0.13, 24, 18);
  const smallGeometry = new THREE.SphereGeometry(0.1, 20, 14);
  const capsuleGeometry = new THREE.CapsuleGeometry(0.12, 0.5, 6, 14);

  body.position.set(0, -0.18, 0);
  addMesh(body, 'Rounded navy body', bodyGeometry, ink, [0, 0, 0], [0.96, 1.2, 0.82]);
  addMesh(body, 'Soft rice belly', softGeometry, rice, [0, -0.08, 0.61], [1.24, 1.56, 0.27]);

  const collarGeometry = new THREE.CapsuleGeometry(0.055, 0.55, 5, 12);
  addMesh(body, 'Left navy collar', collarGeometry, ink, [-0.19, 0.45, 0.7], [1, 1, 0.72], [0.08, 0, -0.62]);
  addMesh(body, 'Right navy collar', collarGeometry.clone(), ink, [0.19, 0.45, 0.7], [1, 1, 0.72], [0.08, 0, 0.62]);

  head.position.set(0, 0.78, 0.02);
  addMesh(head, 'Navy head and hood', bodyGeometry, ink, [0, 0, 0], [0.88, 0.85, 0.82]);
  addMesh(face, 'Warm yellow face mask', softGeometry, yellow, [0, -0.06, 0.49], [1.25, 1.17, 0.42]);
  addMesh(face, 'Left yellow cheek', softGeometry, yellow, [-0.34, -0.16, 0.56], [0.5, 0.44, 0.24]);
  addMesh(face, 'Right yellow cheek', softGeometry, yellow, [0.34, -0.16, 0.56], [0.5, 0.44, 0.24]);

  eyes.position.set(0, 0.07, 0.72);
  addMesh(eyes, 'Left warm eye white', eyeGeometry, eye, [-0.23, 0, 0], [1.12, 1.28, 0.38]);
  addMesh(eyes, 'Right warm eye white', eyeGeometry, eye, [0.23, 0, 0], [1.12, 1.28, 0.38]);
  const leftPupil = addMesh(eyes, 'Left friendly pupil', smallGeometry, ink, [-0.22, -0.005, 0.055], [0.58, 0.72, 0.34]);
  const rightPupil = addMesh(eyes, 'Right friendly pupil', smallGeometry, ink, [0.24, -0.005, 0.055], [0.58, 0.72, 0.34]);
  addMesh(eyes, 'Left eye glint', smallGeometry, eye, [-0.2, 0.04, 0.092], [0.16, 0.2, 0.12]);
  addMesh(eyes, 'Right eye glint', smallGeometry, eye, [0.26, 0.04, 0.092], [0.16, 0.2, 0.12]);

  const beakGeometry = new THREE.SphereGeometry(0.5, 28, 16);
  const beakUpper = addMesh(face, 'Soft upper beak', beakGeometry, deepInk, [0, -0.2, 0.84], [0.55, 0.2, 0.4], [0.03, 0, 0]);
  const beakLower = addMesh(face, 'Smiling lower beak', beakGeometry.clone(), ink, [0, -0.31, 0.81], [0.46, 0.14, 0.34], [-0.08, 0, 0]);
  addMesh(face, 'Beak smile line', softGeometry, yellow, [0, -0.25, 1.005], [0.35, 0.022, 0.02]);

  const buildWing = (wing: MuniWingParts, side: -1 | 1) => {
    const sideName = side < 0 ? 'Left' : 'Right';
    wing.root.position.set(side * 0.6, 0.05, 0.02);
    wing.root.rotation.set(0.02, side * 0.04, side * 0.24);

    addMesh(wing.root, `${sideName} shoulder`, softGeometry, ink, [0, -0.19, 0], [0.52, 0.88, 0.42]);
    wing.foreWing.position.set(0, -0.42, 0.01);
    addMesh(wing.foreWing, `${sideName} fore wing`, capsuleGeometry, ink, [0, -0.17, 0], [0.96, 0.88, 0.66]);
    addMesh(wing.foreWing, `${sideName} yellow wing stripe`, capsuleGeometry, yellow, [side * 0.09, -0.18, 0.12], [0.26, 0.72, 0.2]);
    addMesh(wing.foreWing, `${sideName} teal wing stripe`, capsuleGeometry, teal, [-side * 0.07, -0.28, 0.13], [0.21, 0.55, 0.18]);

    wing.tip.position.set(0, -0.47, 0);
    [-1, 0, 1].forEach((offset, index) => {
      const featherMaterial = index === 0 ? teal : index === 1 ? ink : yellow;
      addMesh(
        wing.tip,
        `${sideName} pointing feather ${index + 1}`,
        capsuleGeometry,
        featherMaterial,
        [offset * 0.1, -0.09 - Math.abs(offset) * 0.025, -0.02 + index * 0.012],
        [0.42, 0.55 - Math.abs(offset) * 0.05, 0.32],
        [0, 0, offset * -0.12],
      );
    });
  };

  buildWing(leftWing, -1);
  buildWing(rightWing, 1);

  tail.position.set(0.28, -0.88, -0.14);
  const tailGeometry = new THREE.CapsuleGeometry(0.09, 0.64, 5, 12);
  addMesh(tail, 'Navy tail feather', tailGeometry, ink, [0, 0, 0], [1, 1, 0.72], [0.1, 0, -0.45]);
  addMesh(tail, 'Yellow tail feather', tailGeometry.clone(), yellow, [0.22, 0.11, -0.03], [0.9, 0.92, 0.66], [0.08, 0, -0.68]);
  addMesh(tail, 'Teal tail feather', tailGeometry.clone(), teal, [0.4, 0.27, -0.06], [0.82, 0.84, 0.62], [0.06, 0, -0.94]);

  feet.position.set(0, -1.18, 0.1);
  const legGeometry = new THREE.CapsuleGeometry(0.035, 0.25, 5, 10);
  const toeGeometry = new THREE.CapsuleGeometry(0.026, 0.2, 4, 9);
  ([-1, 1] as const).forEach((side) => {
    const footX = side * 0.25;
    addMesh(feet, `${side < 0 ? 'Left' : 'Right'} rounded leg`, legGeometry.clone(), ink, [footX, 0, 0], [1, 1, 0.9], [0, 0, side * 0.08]);
    [-1, 0, 1].forEach((toe) => {
      addMesh(
        feet,
        `${side < 0 ? 'Left' : 'Right'} soft toe ${toe + 2}`,
        toeGeometry.clone(),
        ink,
        [footX + toe * 0.07, -0.2, 0.13 + Math.abs(toe) * -0.015],
        [1, 0.9, 0.8],
        [Math.PI / 2, 0, toe * -0.22],
      );
    });
  });

  root.rotation.set(-0.02, -0.1, 0);
  root.userData.mascotRuntime = {
    character: 'Muni si Manyar',
    construction: 'procedural-soft-rig',
    identityAsset: false,
    officialLogoEmbedded: false,
    presentation: 'cute-interactive-3d-interpretation',
    palette: ['ink-navy', 'ramu-teal', 'turmeric-yellow', 'warm-rice'],
  };

  return {
    root,
    meshes,
    parts: {
      body,
      head,
      face,
      eyes,
      leftPupil,
      rightPupil,
      beakUpper,
      beakLower,
      leftWing,
      rightWing,
      tail,
      feet,
    },
  };
}

export function createMuniMascotLights() {
  const lights = new THREE.Group();
  lights.name = 'Muni soft studio lights';

  const hemisphere = new THREE.HemisphereLight(COLORS.eye, COLORS.rice, 2.15);
  const ambient = new THREE.AmbientLight(COLORS.eye, 0.72);
  const key = new THREE.DirectionalLight(0xfff4da, 2.2);
  key.position.set(-3.2, 4.5, 5.6);
  const fill = new THREE.DirectionalLight(COLORS.teal, 0.72);
  fill.position.set(4.4, 1.8, 3.2);
  const warmRim = new THREE.DirectionalLight(COLORS.yellow, 0.48);
  warmRim.position.set(2.2, 3.4, -4.2);

  lights.add(hemisphere, ambient, key, fill, warmRim);
  return lights;
}
