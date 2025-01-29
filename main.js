import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { fbxLoader, progressiveFBXLoader } from './src/utils/fbxLoader';
import { gLTFLoader, progressiveGLTFLoader } from './src/utils/gltfLoader';
import addTestCube from './src/utils/addTestCube';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	20000
);
camera.position.set(0, 300, 500);
const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(0, 1000, 0);
directionalLight1.castShadow = true;
directionalLight1.shadow.bias = -0.005; // Fine-tune this value
scene.add(directionalLight1);

// Add environment
const pmremGenerator = new THREE.PMREMGenerator( renderer );
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(
	new RoomEnvironment(),
	0.04
).texture;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Prevent camera from rotating below the horizontal plane (positive Y)
controls.maxPolarAngle = (85 * Math.PI) / 180; // 85 degrees
controls.update();

// Pass the scene to the loader
// fbxLoader({ fileName: './src/models/LHR.fbx', scene });
progressiveFBXLoader({
	fileName: './src/models/LHR.fbx',
	scene,
	rotateX: -Math.PI / 2,
});
// gLTFLoader({ fileName: './src/models/LHR.glb', scene });
// progressiveGLTFLoader({ fileName: './src/models/LHR.glb', scene });
// addTestCube({ scene });

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();
