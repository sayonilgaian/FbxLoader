import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export function fbxLoader({ fileName = '', scene, rotateX = 0 }) {
	let fbxLoader = new FBXLoader();
	fbxLoader.load(
		fileName,
		(loadedObject) => {
			console.log('Model loaded:', loadedObject);

			// Rotate the entire loaded object by 90 degrees clockwise around the X-axis
			loadedObject.rotation.x = -Math.PI / 2; // Negative for clockwise rotation

			scene?.add(loadedObject); // Add the rotated object to the scene
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		(error) => {
			console.error('Error loading model:', error);
		}
	);
}

export function progressiveFBXLoader({ fileName = '', scene, rotateX = 0 }) {
	const fbxLoader = new FBXLoader();

	// Load the FBX file
	fbxLoader.load(
		fileName,
		(loadedObject) => {
			console.log('Full FBX model loaded. Processing objects...');

			// Rotate the parent group (entire model) by 90 degrees around the X-axis
			loadedObject.rotation.x = rotateX; // Negative for clockwise rotation

			// List of child objects to process
			const children = [...loadedObject.children];
			loadedObject.children = []; // Clear the children to load them one by one

			// Load one child object at a time
			function loadNextChild() {
				if (children.length === 0) {
					console.log('All objects loaded.');
					scene?.add(loadedObject); // Add the parent group after all children are processed
					return;
				}

				// Get the next child
				const child = children.shift();

				// Add the child to the parent group
				loadedObject.add(child);
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
