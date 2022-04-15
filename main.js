import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30)
renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,transparent:true 
})
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xff0000, 1, 100 );
pointLight.position.set(50, 50, 50);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHepler = new THREE.PointLightHelper(pointLight);
// const girdHelper = new THREE.GridHelper(200, 50);
// scene.add(girdHelper,lightHepler);
// const controls = new OrbitControls(camera, renderer.domElement);

// wite a a func addStar
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('https://www.baodanh.ga/images/bg.jpg');
// https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/space.jpg
scene.background = spaceTexture;

// jensen
const jensenTextures = new THREE.TextureLoader().load('js.jpg');
// const jensenTextures = new THREE.TextureLoader().load('https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/space.jpg');
const jensen = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jensenTextures }));
// const jensen = new THREE.Mesh(new THREE.SphereGeometry(3,102,32), new THREE.MeshBasicMaterial({ map: jensenTextures }));
scene.add(jensen);
// moon
// const moonTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/fireship-io/threejs-scroll-animation-demo/main/normal.jpg');
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3,102,32),
//   new THREE.MeshStandardMaterial({map:moonTexture, normalMap:normalTexture})
// )
// moon.position.z = -70;
// moon.position.y = 30;
// moon.position.x = 90;
// moon.position.setX(90);
// scene.add(moon);

jensen.position.z = -7;
jensen.position.x = 4;

// move camera
function moveCamera(){
  const t = document.body.getBoundingClientRect().top
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  jensen.rotation.y += 0.01;
  jensen.rotation.z += 0.05;

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();


// MOUSE

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

let onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
};
document.addEventListener("mousemove", onDocumentMouseMove);
// ANIMATING
const clock = new THREE.Clock();
let rotationMode = true;
let animate0 = () => {
  let elapsedTime = clock.getElapsedTime();

  jensen.position.y = (1 + Math.sin(elapsedTime)) * 0.25;
  let factor = 1 * jensen.position.y;
  if (jensen.position.y > 0.5) {
    factor += 0.1;
  }
  if (jensen.position.y <= 0.000008) {
    rotationMode = !rotationMode;
  }

  if (rotationMode) {
    innerObject.rotation.y += factor * 5 * 0.05;
    outerObject.rotation.z += -1 * factor * 0.1;
    outerObject.rotation.y += -1 * factor * 0.1;
  } else {
    innerObject.rotation.y -= factor * 5 * 0.05;
    outerObject.rotation.z -= -1 * factor * 0.1;
    outerObject.rotation.y -= -1 * factor * 0.1;
  }

  bgParticles.rotation.z += 0.005;
  bgParticles.rotation.x += 0.005;

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  bgParticles.rotation.y += 0.5 * (targetX - bgParticles.rotation.y);

  if (transitionHappening) {
    camera.lookAt(jensen.position);
  }

  clouds.position.x = Math.sin(elapsedTime * 0.5);

  clouds.position.z = Math.cos(elapsedTime * 0.1);

  jensenShadow.material.opacity = 0.7 - jensen.position.y;
  // bgParticles.rotation.x += 0.5 * (targetY - bgParticles.rotation.x);

  renderer.render(scene, camera);
  requestAnimationFrame(animate0);
};

document.addEventListener("mousewheel", (e) => {
  // camera.position.z -= e.deltaY * 0.001;
});


function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  // controls.update()
  jensen.rotation.x += 0.01;
  // moon.rotation.x += 0.005;
  renderer.render(scene,camera);
}
animate()


