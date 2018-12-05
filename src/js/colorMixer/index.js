import './component/pigment';
import './component/pigmentContainer';
import './component/palette';

import RgbMixer from './color/rgbMixer';
import RgbComponent from './rgbComponent.js';

// class ColorMixer {

// }
const rgbMixer = new RgbMixer(0, 0, 0, 0);
const node = document.getElementById('rgbComponent');

new RgbComponent(rgbMixer, node);