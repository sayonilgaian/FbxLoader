import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

self.onmessage = function (event) {
    const { fileName, rotateX } = event.data;
    const loader = new FBXLoader();

    loader.load(
        fileName,
        (loadedObject) => {
            console.log('FBX Model Loaded in Worker');

            // Apply rotation correction
            loadedObject.rotation.x = rotateX;

            // Convert model into transferable format
            const modelData = loadedObject.toJSON();

            // Send the fully constructed model to the main thread
            self.postMessage({ type: 'complete', model: modelData });
        },
        (xhr) => {
            self.postMessage({
                type: 'progress',
                progress: (xhr.loaded / xhr.total) * 100,
            });
        },
        (error) => {
            self.postMessage({ type: 'error', error: error.message });
        }
    );
};

// Required to ensure the worker is treated as an ES module
export {};
