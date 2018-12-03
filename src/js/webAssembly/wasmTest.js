// @ts-check

// @ts-ignore
import wasm from '../../../lib/color';

wasm.init()
  .then((mod) => {
    console.log(mod);

    const memory = mod.memoryManager;
    const addr = memory.malloc(3);

    memory.set(addr[0], 134);
    memory.set(addr[1], 52);
    memory.set(addr[2], 215);

    mod.exports.rgbToHsl(addr[0], addr[1], addr[2]);

    console.log(memory.get(addr[0]), memory.get(addr[1]), memory.get(addr[2]));
  }, (e) => {
    console.log(e);
  })
  .catch(e => console.log(e));