import * as THREE from './build/three.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

const hiddenCanvas = document.getElementById("hiddenCanvas");

//RENDERER
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
modalRenderer.setSize(1080, 1080);
modalRenderer.outputEncoding = THREE.sRGBEncoding

//CAMERA PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
const camera = new THREE.PerspectiveCamera(30, 1, 1, 128);
camera.position.z = 64;

//SCENE
const imgScene = new THREE.Scene();
imgScene.rotation.y = 135 * Math.PI / 180;
imgScene.rotation.x = 0.625;

const modalScene = new THREE.Scene();
modalScene.rotation.y = Math.PI;

//LIGHT
const ambiLight = new THREE.AmbientLight(0xffffff, 0.75);
ambiLight.position.set(0, 0, 0);
imgScene.add(ambiLight);
modalScene.add(ambiLight.clone());

const dirLight = new THREE.DirectionalLight(0xffffff, 0.25);
dirLight.position.set(64, 64, -64);
imgScene.add(dirLight);
modalScene.add(dirLight.clone());

//GLTF LOADER
const loader = new GLTFLoader();

//MESH
var imgMesh

//FUNCTION
function loadModelsToImgs(array) {
  if (array.length <= 0) return;

  //SCENE
  const scene = imgScene.clone();

  //gltf made with Blockbench
  loader.load(array[0].model, handle_load);

  function handle_load(gltf) {
    imgMesh = gltf.scene;

    const box = new THREE.Box3().setFromObject(imgMesh);
    box.getCenter(imgMesh.position);
    imgMesh.position.multiplyScalar(-1);
    scene.add(imgMesh);

    imgRenderer.render(scene, camera);
    array[0].img.src = hiddenCanvas.toDataURL("image/png");
    array.shift();
    loadModelsToImgs(array);
  }
}

//Modal Function
window.loadModelToModal = function(model) {
  //CAMERA
  const modalCamera = camera.clone();

  //CONTROLS
  const controls = new OrbitControls(modalCamera, modalRenderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 16;
  controls.maxDistance = 64;
  controls.update();

  //SCENE
  const scene = modalScene.clone();

  //gltf made with Blockbench
  loader.load(model, handle_load);

  var mesh;

  function handle_load(gltf) {
    mesh = gltf.scene;

    const box = new THREE.Box3().setFromObject(mesh);
    box.getCenter(mesh.position);
    mesh.position.multiplyScalar(-1);
    scene.add(mesh);
    render();
  }

  function render() {
    if (mesh) {
      modalRenderer.render(scene, modalCamera);
    }
  }
}

function generateInputArray() {
  var inputArray = [];
  var object = {};
  var elements = document.getElementsByClassName("card");

  elements.forEach((item, i) => {
    object = {
      img: item.getElementsByTagName("IMG")[0],
      model: item.dataset.model
    }
    inputArray.push(object);
  });
  return inputArray
}

loadModelsToImgs(generateInputArray());

// Modal
$('#modelModal').on('show.bs.modal', function (event) {
  window.loadModelToModal($(event.relatedTarget).data("model"));
})
