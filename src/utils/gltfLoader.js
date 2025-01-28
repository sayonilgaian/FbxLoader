import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function gLTFLoader({ fileName = '', scene }) {
	let gLTFLoader = new GLTFLoader();
	gLTFLoader.load(
		fileName,
		(loadedObject) => {
			console.log('Model loaded:', loadedObject);
			scene?.add(loadedObject.scene); // Add the loaded object to the scene
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		(error) => {
			console.error('Error loading model:', error);
		}
	);
}

export function progressiveGLTFLoader({ fileName = '', scene }) {
	const gLTFLoader = new GLTFLoader();

	// Load the GLTF file
	gLTFLoader.load(
		fileName,
		(loadedObject) => {
			console.log('Full GLTF model loaded. Processing objects...');

			// `loadedObject.scene` contains the entire model (a THREE.Group)
			const children = [...loadedObject.scene.children];
			loadedObject.scene.children = []; // Clear children for progressive loading

			// Load one child object at a time
			function loadNextChild() {
				if (children.length === 0) {
					console.log('All objects loaded.');
					return;
				}

				// Get the next child
				const child = children.shift();

				// Add the child to the scene
				scene?.add(child);
				console.log('Added object:', child);

				// Wait a frame before loading the next child
				requestAnimationFrame(loadNextChild);
			}

			// Start loading children one by one
			loadNextChild();
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		(error) => {
			console.error('Error loading model:', error);
		}
	);
}
