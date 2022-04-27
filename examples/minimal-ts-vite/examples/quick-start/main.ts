import { createC2pa } from 'c2pa';
import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url';
import workerSrc from 'c2pa/dist/c2pa.worker.js?url';

const sampleImage =
  'https://cdn.jsdelivr.net/gh/contentauth/c2pa-js/tests/assets/CAICAI.jpg';

(async () => {
  // Initialize the c2pa-js SDK
  const c2pa = await createC2pa({
    wasmSrc,
    workerSrc,
  });

  // Read in our sample image and get a manifest store
  const { manifestStore } = await c2pa.read(
    sampleImage,
  );
  console.log('manifestStore', manifestStore);

  // Get the active manifest
  const activeManifest = manifestStore?.activeManifest;
  console.log('activeManifest', activeManifest);
})();
