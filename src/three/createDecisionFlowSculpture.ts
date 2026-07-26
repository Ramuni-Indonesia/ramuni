import * as THREE from 'three';

export type DecisionFlowRuntime = {
  root: THREE.Group;
  meshes: THREE.Mesh[];
};

const physicalMaterial = (color: number, roughness = 0.34) => new THREE.MeshPhysicalMaterial({
  color,
  roughness,
  metalness: 0.05,
  clearcoat: 0.28,
  clearcoatRoughness: 0.22,
});

export function createDecisionFlowSculpture(): DecisionFlowRuntime {
  const root = new THREE.Group();
  root.name = 'RAMUNI data-to-direction sculpture';

  const navy = physicalMaterial(0x0b3045);
  const teal = physicalMaterial(0x168c8c, 0.3);
  const rice = physicalMaterial(0xf4f0e7, 0.48);
  const yellow = physicalMaterial(0xf2b134, 0.38);
  const meshes: THREE.Mesh[] = [];

  const cardGeometry = new THREE.BoxGeometry(1.48, 0.72, 0.18, 4, 2, 2);
  const cardSpecs = [
    { position: [-0.48, -0.66, -0.08], rotation: -0.12, material: navy },
    { position: [0.08, 0, 0.04], rotation: 0.08, material: rice },
    { position: [0.48, 0.66, 0.14], rotation: -0.06, material: teal },
  ] as const;

  cardSpecs.forEach((spec, index) => {
    const card = new THREE.Mesh(cardGeometry.clone(), spec.material);
    card.name = ['Data card', 'Evidence card', 'Direction card'][index];
    card.position.set(spec.position[0], spec.position[1], spec.position[2]);
    card.rotation.set(-0.05 + index * 0.035, spec.rotation, spec.rotation * 0.32);
    card.castShadow = true;
    card.receiveShadow = true;
    root.add(card);
    meshes.push(card);
  });

  const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.35, 24), yellow);
  rail.name = 'Evidence rail';
  rail.position.set(-0.6, 0, 0.28);
  rail.rotation.z = -0.48;
  rail.castShadow = true;
  root.add(rail);
  meshes.push(rail);

  const nodeGeometry = new THREE.SphereGeometry(0.105, 24, 16);
  ([[-0.84, -0.62, 0.36], [-0.58, 0.02, 0.38], [-0.25, 0.7, 0.4]] as Array<[number, number, number]>).forEach((position, index) => {
    const node = new THREE.Mesh(nodeGeometry.clone(), index === 2 ? teal : yellow);
    node.name = `Evidence node ${index + 1}`;
    node.position.set(position[0], position[1], position[2]);
    node.castShadow = true;
    root.add(node);
    meshes.push(node);
  });

  root.rotation.set(-0.08, -0.22, 0.02);
  root.userData.sculptRuntime = {
    concept: 'catatan-bukti-arah',
    identityAsset: false,
    components: ['data-card', 'evidence-card', 'direction-card', 'evidence-rail'],
  };

  return { root, meshes };
}

export function createDecisionFlowLights() {
  const lights = new THREE.Group();
  const hemisphere = new THREE.HemisphereLight(0xf7fbff, 0x0b3045, 1.35);
  const key = new THREE.DirectionalLight(0xfff4de, 2.8);
  key.position.set(-3.5, 4.8, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 5;
  const rim = new THREE.DirectionalLight(0xf2b134, 1.15);
  rim.position.set(4, 2.4, -4);
  lights.add(hemisphere, key, rim);
  return lights;
}
