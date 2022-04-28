import { createC2pa } from 'c2pa';
import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url';
import workerSrc from 'c2pa/dist/c2pa.worker.js?url';

const sampleImage =
  'https://cdn.jsdelivr.net/gh/contentauth/c2pa-js/tests/assets/CAICAI.jpg';

const properties: Record<string, string> = {};
let output: string[] = [];

(async () => {
  const c2pa = await createC2pa({
    wasmSrc,
    workerSrc,
  });

  const { manifestStore, source } = await c2pa.read(sampleImage);
  const activeManifest = manifestStore?.activeManifest;
  if (activeManifest) {
    // Get thumbnail
    // Note: You would normally call `dispose()` when working with a
    // component-based UI library (e.g. on component un-mount)
    const { data, dispose } = source.thumbnail.getUrl();

    // Get properties
    properties.title = activeManifest.title;
    properties.format = activeManifest.format;
    properties.label = activeManifest.label;
    properties.claimGenerator =
      activeManifest.claimGenerator.product;
    properties.producer =
      activeManifest.producer?.name ?? 'Unknown';
    properties.thumbnail = `<img src="${data.url}" class="thumbnail" />`;
    properties.ingredients = (activeManifest.ingredients ?? [])
      .map((i) => i.title)
      .join(', ');
    properties.signatureIssuer = activeManifest.signature.issuer;
    properties.signatureDate =
      activeManifest.signature.date?.toString() ??
      'No date available';

    output = Object.keys(properties).map((key) => {
      return `
        <tr>
          <td>${key}</td>
          <td>${properties[key]}</td>
        </tr>
      `;
    });
  } else {
    output.push(`
      <tr>
        <td colspan="2">No provenance data found</td>
      </tr>
    `);
  }

  document.querySelector('#results tbody')!.innerHTML =
    output.join('');
})();
