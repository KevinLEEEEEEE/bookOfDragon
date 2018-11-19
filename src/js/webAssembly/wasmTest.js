// @ts-check

// @ts-ignore
import * as test from '../../wasm/lastTest.wasm';

var importObject = { imports: { i: arg => arg } };

function instantiate(bytes, imports) {
  // @ts-ignore
  return WebAssembly.compile(bytes).then(m => new WebAssembly.Instance(m, imports));
}

instantiate(test, importObject).then(instance => instance.exports.e());


// @ts-ignore
// import WebWorker from './webworker.worker';

// const workers = new WebWorker();

// workers.addEventListener('message', (e) => {
//   console.log(e.data);
// });

// workers.addEventListener('error', (e) => {
//   console.log(e);
// });

// workers.postMessage({ hi: '2' });