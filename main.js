import "./css/style.css";
import "./css/cat.css";

// import "./js/winbox.bundle.js"
// import "./js/main.js"

// Option 1: Import the entire three.js core library.
import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const INITIAL_COLOR = {
  r: 0.1,
  g: 0.1,
  b: 0.1,
};
const HOVER_COLOR = {
  r: 0.3,
  g: 0.3,
  b: 0.3,
};
let frame = 0;
const world = {
  plane: {
    width: 200,
    height: 200,
    widthSegments: 50,
    heightSegments: 50,
  },
};

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
// no jagged
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
// new OrbitControls(camera, renderer.domElement);
camera.position.z = 30;

const mouse = {
  x: undefined,
  y: undefined,
};
//  INIT Plane

const planeGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
);
const planeMaterial = new THREE.MeshPhongMaterial({
  // color: 0xFF0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
// Init randomize Vertices
randomizeVertices();

// Initial Color
const colors = [];
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
  colors.push(INITIAL_COLOR.r, INITIAL_COLOR.g, INITIAL_COLOR.b);
}
planeMesh.geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), 3)
);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);


function randomizeVertices() {
  let randomValues = [];
  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i++) {

    if (i % 3 === 0) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];

      array[i] = x + (Math.random() - 0.5) * 2;
      array[i + 1] = y + (Math.random() - 0.5) * 3;
      array[i + 2] = z + (Math.random() - 0.5) * 3;
    }
    randomValues.push(Math.random() * Math.PI * 2);
  }
  planeMesh.geometry.attributes.position.randomValues = randomValues;
}
function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  randomizeVertices();
  // mouseover color
  const colors = [];
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(INITIAL_COLOR.r, INITIAL_COLOR.g, INITIAL_COLOR.b);
  }
  planeMesh.geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  );
  planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // planeMesh.rotation.x += 0.01;
  raycaster.setFromCamera(mouse, camera);
  frame += 0.01;

  const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01;
    array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i]) * 0.01;

  }
  planeMesh.geometry.attributes.position.needsUpdate = true;

  const intersects = raycaster.intersectObject(planeMesh);
  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes;

    // RGB Red
    color.setX(intersects[0].face.a, HOVER_COLOR.r);
    color.setX(intersects[0].face.b, HOVER_COLOR.r);
    color.setX(intersects[0].face.c, HOVER_COLOR.r);

    // RGB Green
    color.setY(intersects[0].face.a, HOVER_COLOR.g);
    color.setY(intersects[0].face.b, HOVER_COLOR.g);
    color.setY(intersects[0].face.c, HOVER_COLOR.g);

    // RGB Blue
    color.setZ(intersects[0].face.a, HOVER_COLOR.b);
    color.setZ(intersects[0].face.b, HOVER_COLOR.b);
    color.setZ(intersects[0].face.c, HOVER_COLOR.b);

    color.needsUpdate = true;

    setTimeout(() => {
      color.setX(intersects[0].face.a, INITIAL_COLOR.r);
      color.setX(intersects[0].face.b, INITIAL_COLOR.r);
      color.setX(intersects[0].face.c, INITIAL_COLOR.r);

      // RGB Green
      color.setY(intersects[0].face.a, INITIAL_COLOR.g);
      color.setY(intersects[0].face.b, INITIAL_COLOR.g);
      color.setY(intersects[0].face.c, INITIAL_COLOR.g);

      // RGB Blue
      color.setZ(intersects[0].face.a, INITIAL_COLOR.b);
      color.setZ(intersects[0].face.b, INITIAL_COLOR.b);
      color.setZ(intersects[0].face.c, INITIAL_COLOR.b);
      color.needsUpdate = true;
    }, 500);
    // gsap.to(HOVER_COLOR, {
    //   r: INITIAL_COLOR.r,
    //   g: INITIAL_COLOR.g,
    //   b: INITIAL_COLOR.b,
    //   duration: 1,
    //   onStart: () => {
    //     //console.log("Update Hover COlor")
    //     // RGB Red
    //     color.setX(intersects[0].face.a, HOVER_COLOR.r);
    //     color.setX(intersects[0].face.b, HOVER_COLOR.r);
    //     color.setX(intersects[0].face.c, HOVER_COLOR.r);

    //     // RGB Green
    //     color.setY(intersects[0].face.a, HOVER_COLOR.g);
    //     color.setY(intersects[0].face.b, HOVER_COLOR.g);
    //     color.setY(intersects[0].face.c, HOVER_COLOR.g);

    //     // RGB Blue
    //     color.setZ(intersects[0].face.a, HOVER_COLOR.b);
    //     color.setZ(intersects[0].face.b, HOVER_COLOR.b);
    //     color.setZ(intersects[0].face.c, HOVER_COLOR.b);
    //     color.needsUpdate = true;
    //   },
    // });
  }
}
animate();

// eVENT lISTENER
addEventListener("mousemove", (event) => {
  // normalized Coords for three js
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * -2 + 1;
});
