import { createC2pa } from 'c2pa';
import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url';
import workerSrc from 'c2pa/dist/c2pa.worker.js?url';
import expect from '@storybook/expect';

const sampleImage =
  'https://cdn.jsdelivr.net/gh/contentauth/c2pa-js/tests/assets/CAICAI.jpg';

(async () => {
  const c2pa = await createC2pa({
    wasmSrc,
    workerSrc,
  });

  const { manifestStore } = await c2pa.read(sampleImage);
  const activeManifest = manifestStore?.activeManifest;
  const firstAction =
    activeManifest?.assertions.get('c2pa.actions')?.actions?.[0];

  console.log('manifestStore', manifestStore);
  console.log('activeManifest', activeManifest);

  // Querying the active manifest
  expect(activeManifest?.title).toEqual('CAICAI.jpg');
  expect(activeManifest?.producer?.name).toEqual('Gavin Peacock');
  expect(activeManifest?.signature.date).toEqual(
    new Date('2022-04-20T22:44:41.000Z'),
  );
  expect(firstAction).toMatchObject({
    action: 'c2pa.edited',
    parameters: {
      name: 'import',
    },
  });
})();
