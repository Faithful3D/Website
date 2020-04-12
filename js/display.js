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
modalScene.rotation.y = Math.PI;

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
  // Tool models slide 1
  {
    img: document.getElementById("sword"),
    model: "gltf/tools_and_weapons/netherite_sword.gltf"
  },
  {
    img: document.getElementById("pickaxe"),
    model: "gltf/tools_and_weapons/netherite_pickaxe.gltf"
  },
  {
    img: document.getElementById("shovel"),
    model: "gltf/tools_and_weapons/netherite_shovel.gltf"
  },
  {
    img: document.getElementById("axe"),
    model: "gltf/tools_and_weapons/netherite_axe.gltf"
  },
  // Tool models slide 2
  {
    img: document.getElementById("hoe"),
    model: "gltf/tools_and_weapons/netherite_hoe.gltf"
  },
  {
    img: document.getElementById("bow"),
    model: "gltf/tools_and_weapons/bow_pulling_2.gltf"
  },
  {
    img: document.getElementById("crossbow"),
    model: "gltf/tools_and_weapons/crossbow_arrow.gltf"
  },
  {
    img: document.getElementById("flint_and_steel"),
    model: "gltf/tools_and_weapons/flint_and_steel.gltf"
  },
  // Redstone slide 1
  {
    img: document.getElementById("redstone_torch"),
    model: "gltf/redstone/redstone_torch.gltf"
  },
  {
    img: document.getElementById("piston"),
    model: "gltf/redstone/piston.gltf"
  },
  {
    img: document.getElementById("sticky_piston"),
    model: "gltf/redstone/sticky_piston.gltf"
  },
  {
    img: document.getElementById("redstone_lamp"),
    model: "gltf/redstone/redstone_lamp_on.gltf"
  },
  // Redstone slide 2
  {
    img: document.getElementById("rail"),
    model: "gltf/redstone/rail.gltf"
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
  },
  // Farming slide 1
  {
    img: document.getElementById("beehive_honey"),
    model: "gltf/farming/beehive_honey.gltf"
  },
  {
    img: document.getElementById("bee_nest_honey"),
    model: "gltf/farming/bee_nest_honey.gltf"
  },
  {
    img: document.getElementById("hay_block"),
    model: "gltf/farming/hay_block.gltf"
  },
  {
    img: document.getElementById("dried_kelp_block"),
    model: "gltf/farming/dried_kelp_block.gltf"
  }
  // Farming slide 2
   {
    img: document.getElementById("beetroots_stage3"),
    model: "gltf/farming/beetroots_stage3.gltf"
  },
  {
    img: document.getElementById("carrots_stage3"),
    model: "gltf/farming/carrots_stage3.gltf"
  },
  {
    img: document.getElementById("potatoes_stage3"),
    model: "gltf/farming/potatoes_stage3.gltf"
  },
  {
    img: document.getElementById("cocoa_stage2"),
    model: "gltf/farming/cocoa_stage2.gltf"
  },
  // Farming slide 3
  {
    img: document.getElementById("brown_mushroom"),
    model: "gltf/farming/brown_mushroom.gltf"
  },
  {
    img: document.getElementById("red_mushroom"),
    model: "gltf/farming/red_mushroom.gltf"
  },
  {
    img: document.getElementById("crimson_fungus"),
    model: "gltf/farming/crimson_fungus.gltf"
  },
  {
    img: document.getElementById("warped_fungus"),
    model: "gltf/farming/warped_fungus.gltf"
  },
  // Farming slide 4
  {
    img: document.getElementById("cactus"),
    model: "gltf/farming/cactus.gltf"
  },
  {
    img: document.getElementById("pumpkin"),
    model: "gltf/farming/pumpkin.gltf"
  },
  {
    img: document.getElementById("carved_pumpkin"),
    model: "gltf/farming/carved_pumpkin.gltf"
  },
  {
    img: document.getElementById("jack_o_lantern"),
    model: "gltf/farming/jack_o_lantern.gltf"
  },
  // Farming slide 5
  {
    img: document.getElementById("farmland"),
    model: "gltf/farming/farmland.gltf"
  },
  {
    img: document.getElementById("lily_pad_1"),
    model: "gltf/farming/lily_pad_1.gltf"
  },
  {
    img: document.getElementById("sugar_cane"),
    model: "gltf/farming/sugar_cane.gltf"
  },
  {
    img: document.getElementById("wheat_stage7"),
    model: "gltf/farming/wheat_stage7.gltf"
  }
]
loadModelsToImgs(inputArray);

// Modal
$('#modelModal').on('show.bs.modal', function (event) {
  window.loadModelToModal($(event.relatedTarget).data("model"));
})
