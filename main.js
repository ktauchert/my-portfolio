import './style.css'

// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10
  }
}
gui.add(world.plane, 'width', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'widthSegments', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'heightSegments', 1, 20).onChange(generatePlane)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1, 1000
)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(
  innerWidth, innerHeight
)
// no jagged 
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(
  renderer.domElement
)
new OrbitControls(
  camera, renderer.domElement
)
camera.position.z = 5;

// // A BOX IN GREEN
// const boxGeometry = new THREE.BoxGeometry(
//   1, 1, 1
// )
// const material = new THREE.MeshBasicMaterial(
//   { color: 0x00FF00 }
// )
// const mesh = new THREE.Mesh(
//   boxGeometry, material
// )

//  A Plane
const planeGeometry = new THREE.PlaneGeometry(
  10, 10, 10, 10
)
const planeMaterial = new THREE.MeshPhongMaterial(
  {
    color: 0xFF0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading
  }
)
const planeMesh = new THREE.Mesh(
  planeGeometry, planeMaterial
)
scene.add(planeMesh);

console.log(planeMesh.geometry.attributes.position.array);
randomizeZVertices();
// Lighting
const light = new THREE.DirectionalLight(
  0xFFFFFF, 1
)
light.position.set(0, 0, 1)
scene.add(light);

function randomizeZVertices() {
  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random()
  }
}
function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  randomizeZVertices();
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // planeMesh.rotation.x += 0.01;
}
animate();