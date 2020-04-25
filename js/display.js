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
const ambiLight = new THREE.AmbientLight(0xffffff, 1);
ambiLight.position.set(0, 0, 0);
imgScene.add(ambiLight);
modalScene.add(ambiLight.clone());

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
  // Redstone slide 3
  {
    img: document.getElementById("dispenser"),
    model: "gltf/redstone/dispenser.gltf"
  },
  {
    img: document.getElementById("dropper"),
    model: "gltf/redstone/dropper.gltf"
  },
  {
    img: document.getElementById("redstone_dust_dot"),
    model: "gltf/redstone/redstone_dust_dot.gltf"
  },
  {
    img: document.getElementById("tripwire_hook_attached_on"),
    model: "gltf/redstone/tripwire_hook_attached_on.gltf"
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
  },
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
  },
  // Utilities slide 1
  {
    img: document.getElementById("barrel"),
    model: "gltf/utilities/barrel.gltf"
  },
  {
    img: document.getElementById("blast_furnace_on"),
    model: "gltf/utilities/blast_furnace_on.gltf"
  },
  {
    img: document.getElementById("bookshelf"),
    model: "gltf/utilities/bookshelf.gltf"
  },
  {
    img: document.getElementById("brewing_stand"),
    model: "gltf/utilities/brewing_stand.gltf"
  },
  // Utilities slide 2
  {
    img: document.getElementById("cartography_table"),
    model: "gltf/utilities/cartography_table.gltf"
  },
  {
    img: document.getElementById("composter"),
    model: "gltf/utilities/composter.gltf"
  },
  {
    img: document.getElementById("enchanting_table"),
    model: "gltf/utilities/enchanting_table.gltf"
  },
  {
    img: document.getElementById("end_portal_frame_filled"),
    model: "gltf/utilities/end_portal_frame_filled.gltf"
  },
  // Utilities slide 3
  {
    img: document.getElementById("furnace_on"),
    model: "gltf/utilities/furnace_on.gltf"
  },
  {
    img: document.getElementById("lectern"),
    model: "gltf/utilities/lectern.gltf"
  },
  {
    img: document.getElementById("lodestone"),
    model: "gltf/utilities/lodestone.gltf"
  },
  {
    img: document.getElementById("loom"),
    model: "gltf/utilities/loom.gltf"
  },
  // Utilities slide 4
  {
    img: document.getElementById("smoker_on"),
    model: "gltf/utilities/smoker_on.gltf"
  },
  {
    img: document.getElementById("spawner"),
    model: "gltf/utilities/spawner.gltf"
  },
  {
    img: document.getElementById("stonecutter"),
    model: "gltf/utilities/stonecutter.gltf"
  }

]
loadModelsToImgs(inputArray);

// Modal
$('#modelModal').on('show.bs.modal', function (event) {
  window.loadModelToModal($(event.relatedTarget).data("model"));
})
