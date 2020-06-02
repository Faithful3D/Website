import * as THREE from './build/three.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

/*
 * Variables
 */
const loader = new GLTFLoader();
const hiddenCanvas = document.getElementById("hiddenCanvas");
var array, imgMesh, scene, url;

const imgRenderer = new THREE.WebGLRenderer({
  canvas: hiddenCanvas,
  antialias: true
});
imgRenderer.setClearColor(0x17191D);
imgRenderer.setPixelRatio(window.devicePixelRatio);
imgRenderer.setSize(198, 198);
imgRenderer.outputEncoding = THREE.sRGBEncoding

const modalRenderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("modalCanvas"),
  antialias: true
});
modalRenderer.setClearColor(0x17191D);
modalRenderer.setPixelRatio(window.devicePixelRatio);
modalRenderer.setSize(4096, 4096);
modalRenderer.outputEncoding = THREE.sRGBEncoding

const camera = new THREE.PerspectiveCamera(30, 1, 1, 128);
camera.position.z = 64;

const imgScene = new THREE.Scene();
imgScene.rotation.y = 135 * Math.PI / 180;
imgScene.rotation.x = 0.625;

const modalScene = new THREE.Scene();
modalScene.rotation.y = Math.PI;

const ambiLight = new THREE.AmbientLight(0xffffff, 0.75);
ambiLight.position.set(0, 0, 0);
imgScene.add(ambiLight);
modalScene.add(ambiLight.clone());

const dirLight = new THREE.DirectionalLight(0xffffff, 0.25);
dirLight.position.set(64, 64, -64);
imgScene.add(dirLight);
modalScene.add(dirLight.clone());

/*
 * Functions
 */
function generateInputArray() {
  var inputArray = [];
  var object = {};

  for (const item of document.getElementsByClassName("card")) {
    object = {
      img: item.getElementsByTagName("IMG")[0],
      model: item.dataset.model
    }
    inputArray.push(object);
  }
  return inputArray
}

function loadModelsToImgs() {
  if (array.length <= 0) return;
  scene = imgScene.clone();
  loader.load(array[0].model, onLoad);
}

function onLoad(gltf) {
  imgMesh = gltf.scene;
  const box = new THREE.Box3().setFromObject(imgMesh);
  box.getCenter(imgMesh.position);
  imgMesh.position.multiplyScalar(-1);
  scene.add(imgMesh);
  imgRenderer.render(scene, camera);
  hiddenCanvas.toBlob(loadBlob);
}

function loadBlob(blob) {
  url = URL.createObjectURL(blob);
  array[0].img.onload = onImgLoad;
  array[0].img.src = url;
}

function onImgLoad() {
  URL.revokeObjectURL(url);
  array.shift();
  loadModelsToImgs(array);
}

window.loadModelToModal = function(model) {
  const modalCamera = camera.clone();
  const modalSceneLocal = modalScene.clone();
  var mesh;

  const controls = new OrbitControls(modalCamera, modalRenderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 16;
  controls.maxDistance = 64;
  controls.update();

  loader.load(model, handle_load);

  function handle_load(gltf) {
    mesh = gltf.scene;
    const box = new THREE.Box3().setFromObject(mesh);
    box.getCenter(mesh.position);
    mesh.position.multiplyScalar(-1);
    modalSceneLocal.add(mesh);
    render();
  }

  function render() {
    if (mesh) modalRenderer.render(modalSceneLocal, modalCamera);
  }
}

/*
 * Execute
 */
array = generateInputArray();
loadModelsToImgs();

$('#modelModal').on('show.bs.modal', function (event) {
  window.loadModelToModal($(event.relatedTarget).data("model"));
})
