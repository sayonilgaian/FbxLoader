import * as THREE from 'three';

export default function addTestCube({ scene }) {
	const cubeSide = 500
	// Test object
	const geometry = new THREE.BoxGeometry(cubeSide, cubeSide, cubeSide);
	const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	const gridHelper = new THREE.GridHelper(cubeSide * 5)
	scene.add(gridHelper)
}
