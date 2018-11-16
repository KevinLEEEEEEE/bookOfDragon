import '../css/main.css';

import Haffman from './adaptiveHaffman/haffman';

const haffman = new Haffman();

haffman.init();

// function deco(target) {
//   console.log(target.prototype);
// }

// @deco
// class Decota {
//   hi = 2;

//   h() {
//     return this.isTestable;
//   }
// }
// const ii = new Decota();


// console.log(ii.getPrototype());