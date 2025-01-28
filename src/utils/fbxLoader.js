import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export function fbxLoader({ fileName = '', scene }) {
	let fbxLoader = new FBXLoader();
	fbxLoader.load(
		fileName,
		(loadedObject) => {
			console.log('Model loaded:', loadedObject);
			scene?.add(loadedObject); // Add the loaded object to the scene
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		(error) => {
			console.error('Error loading model:', error);
		}
	);
}

export function progressiveFBXLoader({ fileName = '', scene }) {
	const fbxLoader = new FBXLoader();

	// Load the FBX file
	fbxLoader.load(
		fileName,
		(loadedObject) => {
			console.log('Full FBX model loaded. Processing objects...');

			// List of child objects to process
			const children = [...loadedObject.children];
			loadedObject.children = []; // Clear the children to load them one by one

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

