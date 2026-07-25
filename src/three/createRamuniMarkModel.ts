import * as THREE from 'three';

export type RamuniMarkRuntime = {
  root: THREE.Group;
  navyRibbon: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhysicalMaterial>;
  tealRibbon: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhysicalMaterial>;
};

const roundedShape = (points: Array<[number, number]>, radius = 0.055) => {
  const shape = new THREE.Shape();
  const count = points.length;
  for (let index = 0; index < count; index += 1) {
    const previous = new THREE.Vector2(...points[(index - 1 + count) % count]);
    const current = new THREE.Vector2(...points[index]);
    const next = new THREE.Vector2(...points[(index + 1) % count]);
    const incoming = previous.clone().sub(current).normalize();
    const outgoing = next.clone().sub(current).normalize();
    const distance = Math.min(radius, current.distanceTo(previous) * 0.22, current.distanceTo(next) * 0.22);
    const start = current.clone().addScaledVector(incoming, distance);
    const end = current.clone().addScaledVector(outgoing, distance);
    if (index === 0) shape.moveTo(start.x, start.y);
    else shape.lineTo(start.x, start.y);
    shape.quadraticCurveTo(current.x, current.y, end.x, end.y);
  }
  shape.closePath();
  return shape;
};

const createGeometry = (points: Array<[number, number]>, depth: number) => {
  const geometry = new THREE.ExtrudeGeometry(roundedShape(points), {
    depth,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: 16,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
};

export function createRamuniMarkModel(): RamuniMarkRuntime {
  const root = new THREE.Group();
  root.name = 'RAMUNI direction mark';

  const navyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0b3045,
    roughness: 0.34,
    metalness: 0.06,
    clearcoat: 0.34,
    clearcoatRoughness: 0.2,
  });
  const tealMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x168c8c,
    roughness: 0.32,
    metalness: 0.05,
    clearcoat: 0.38,
    clearcoatRoughness: 0.18,
  });

  const navyPoints: Array<[number, number]> = [
    [-0.56, -0.76],
    [-0.39, -0.77],
    [0.02, -0.13],
    [0.32, -0.13],
    [0.58, 0.76],
    [0.40, 0.81],
    [0.04, 0.81],
    [-0.61, -0.67],
  ];
  const tealPoints: Array<[number, number]> = [
    [-0.55, 0.26],
    [-0.42, 0.48],
    [0.03, 0.48],
    [0.72, -0.17],
    [0.78, -0.39],
    [0.47, -0.57],
    [0.32, -0.58],
    [-0.11, -0.19],
    [-0.58, -0.19],
  ];

  const navyRibbon = new THREE.Mesh(createGeometry(navyPoints, 0.17), navyMaterial);
  navyRibbon.name = 'Navy rising ribbon';
  navyRibbon.position.set(-0.18, 0.02, -0.03);
  navyRibbon.rotation.y = -0.08;
  navyRibbon.castShadow = true;
  navyRibbon.receiveShadow = true;

  const tealRibbon = new THREE.Mesh(createGeometry(tealPoints, 0.15), tealMaterial);
  tealRibbon.name = 'Teal direction ribbon';
  tealRibbon.position.set(0.27, -0.23, 0.09);
  tealRibbon.scale.setScalar(0.88);
  tealRibbon.rotation.set(-0.03, 0.09, -0.015);
  tealRibbon.castShadow = true;
  tealRibbon.receiveShadow = true;

  root.add(navyRibbon, tealRibbon);
  root.rotation.set(-0.04, -0.18, 0.02);
  root.userData.sculptRuntime = {
    components: ['navy-ribbon', 'teal-ribbon'],
    source: '/brand/ramuni-mark-color.webp',
    fidelity: 'single-view brand sculpture',
  };

  return { root, navyRibbon, tealRibbon };
}

export function createRamuniMarkLights() {
  const lights = new THREE.Group();
  const hemisphere = new THREE.HemisphereLight(0xf7fbff, 0x0b3045, 1.45);
  const key = new THREE.DirectionalLight(0xfff4de, 3.1);
  key.position.set(-3.5, 4.8, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 5;
  const rim = new THREE.DirectionalLight(0xf2b134, 1.4);
  rim.position.set(4, 2.4, -4);
  lights.add(hemisphere, key, rim);
  return lights;
}

