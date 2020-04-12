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

const modalRenderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("modalCanvas"),
  antialias: true
});
modalRenderer.setClearColor(0x17191D);
modalRenderer.setPixelRatio(window.devicePixelRatio);
modalRenderer.setSize(1080, 1080);

//CAMERA PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
const camera = new THREE.PerspectiveCamera(30, 1, 1, 128);
camera.position.z = 64;

//SCENE
const imgScene = new THREE.Scene();
imgScene.rotation.y = 135 * Math.PI / 180;
imgScene.rotation.x = 0.625;

const modalScene = new THREE.Scene();

//GLOBAL LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
imgScene.add(directionalLight);
modalScene.add(directionalLight.clone());
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
imgScene.add(ambientLight);
modalScene.add(ambientLight.clone());

//LIGHTS PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
const lightTop = new THREE.PointLight(0xffffff, 2, 160, 2);
lightTop.position.set(0, 64, 0);
imgScene.add(lightTop);
modalScene.add(lightTop.clone());

const lightNorth = new THREE.PointLight(0xffffff, 2, 160, 2);
lightNorth.position.set(0, 0, -64);
imgScene.add(lightNorth);
modalScene.add(lightNorth.clone());

const lightEast = new THREE.PointLight(0xffffff, 2, 160, 2);
lightEast.position.set(-64, 0, 0);
imgScene.add(lightEast);
modalScene.add(lightEast.clone());

const lightSouth = new THREE.PointLight(0xffffff, 2, 160, 2);
lightSouth.position.set(0, 0, 64);
modalScene.add(lightSouth);

const lightWest = new THREE.PointLight(0xffffff, 2, 160, 2);
lightWest.position.set(64, 0, 0);
modalScene.add(lightWest);

const lightBottom = new THREE.PointLight(0xffffff, 2, 160, 2);
lightBottom.position.set(0, -64, 0);
imgScene.add(lightBottom);
modalScene.add(lightBottom.clone());

//GLTF LOADER
const loader = new GLTFLoader();

//FUNCTION
function loadModelsToImgs(array) {
  if (array.length <= 0) return;

  //SCENE
  const scene = imgScene.clone();

  //gltf made with Blockbench
  loader.load(array[0].model, handle_load);

  var mesh;

  function handle_load(gltf) {
    mesh = gltf.scene;

    const box = new THREE.Box3().setFromObject(mesh);
    box.getCenter(mesh.position);
    mesh.position.multiplyScalar(-1);
    scene.add(mesh);

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
  const controls = new OrbitControls( modalCamera, modalRenderer.domElement );
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

const inputArray = [
  // Undefined Element :
  {
    img: document.getElementById("undefined"),
    model: "../undefined.gltf"
  },
  // Tool models slide 1
  {
    img: document.getElementById("sword"),
    model: "../tools_and_weapons/netherite_sword.gltf"
  },
  {
    img: document.getElementById("pickaxe"),
    model: "../tools_and_weapons/netherite_pickaxe.gltf"
  },
  {
    img: document.getElementById("shovel"),
    model: "../tools_and_weapons/netherite_shovel.gltf"
  },
  {
    img: document.getElementById("axe"),
    model: "../tools_and_weapons/netherite_axe.gltf"
  },
  // Tool models slide 2
  {
    img: document.getElementById("hoe"),
    model: "../tools_and_weapons/netherite_hoe.gltf"
  },
  {
    img: document.getElementById("bow"),
    model: "../tools_and_weapons/bow_pulling_2.gltf"
  },
  {
    img: document.getElementById("crossbow"),
    model: "../tools_and_weapons/crossbow_arrow.gltf"
  },
  {
    img: document.getElementById("flint_and_steel"),
    model: "../tools_and_weapons/flint_and_steel.gltf"
  },
  // Redstone slide 1
  {
    img: document.getElementById("redstone_torch"),
    model: "../redstone/redstone_torch.gltf"
  },
  {
    img: document.getElementById("piston"),
    model: "../redstone/piston.gltf"
  },
  {
    img: document.getElementById("sticky_piston"),
    model: "../redstone/sticky_piston.gltf"
  },
  {
    img: document.getElementById("redstone_lamp"),
    model: "../redstone/redstone_lamp_on.gltf"
  },
  // Redstone slide 1
  {
    img: document.getElementById("rail"),
    model: "../redstone/rail.gltf"
  },
  {
    img: document.getElementById("activator_rail"),
    model: "gltf/redstone/activator_rail.gltf"
  },
  {
    img: document.getElementById("powered_rail"),
    model: "gltf/redstone/powered_rail.gltf"
  },
  {
    img: document.getElementById("detector_rail"),
    model: "gltf/redstone/detector_rail.gltf"
  }
]
loadModelsToImgs(inputArray);

// Modal
$('#modelModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var model = button.data("model");
  window.loadModelToModal(model);
})
