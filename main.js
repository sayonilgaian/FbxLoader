import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { fbxLoader, progressiveFBXLoader } from './src/utils/fbxLoader';
import {gLTFLoader, progressiveGLTFLoader} from './src/utils/gltfLoader';
import addTestCube from './src/utils/addTestCube';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	0.001,
	5000
);
camera.position.set(0, 100, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Prevent camera from rotating below the horizontal plane (positive Y)
// controls.maxPolarAngle = (85 * Math.PI) / 180; // 85 degrees
controls.update();

// Pass the scene to the loader
// fbxLoader({ fileName: './src/models/LHR.fbx', scene });
// progressiveFBXLoader({ fileName: './src/models/LHR.fbx', scene });
// gLTFLoader({ fileName: './src/models/LHR.glb', scene });
// progressiveGLTFLoader({ fileName: './src/models/LHR.glb', scene });
addTestCube({ scene });

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();
