import '../css/main.css';

import Haffman from './adaptiveHaffman/haffman';

const haffman = new Haffman();

haffman.add('A');
// haffman.add('A');
// haffman.add('D');
// haffman.add('C');
// haffman.add('C');
// haffman.add('D');
// haffman.add('D');

console.log(haffman.existNodeList);
console.log(haffman.rootNode);