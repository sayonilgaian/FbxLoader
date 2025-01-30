import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

self.onmessage = function (event) {
    const { fileData, rotateX } = event.data;
    const loader = new FBXLoader();

    try {
        console.log('Parsing FBX binary data in Worker');

        // Ensure `fileData` is in the correct format before parsing
        if (!(fileData instanceof ArrayBuffer)) {
            throw new Error('Invalid file data format: Expected ArrayBuffer');
        }

        // Parse FBX binary data
        const loadedObject = loader.parse(fileData, '');

        // Apply rotation correction
        loadedObject.rotation.x = rotateX;

        // Convert the model into JSON format for transfer
        const modelData = loadedObject.toJSON();

        // Send processed model back to main thread
        self.postMessage({ type: 'complete', model: modelData });

    } catch (error) {
        console.error('Worker FBX Load Error:', error);
        self.postMessage({ type: 'error', error: error.message });
    }
};

// Required to ensure the worker is treated as an ES module
export {};
