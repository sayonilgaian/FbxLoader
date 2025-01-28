import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerHeight / window.innerWidth,
	0.001,
	500
);
camera.position.z = -5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate()
