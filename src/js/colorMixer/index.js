import './component/pigment';
import './component/pigmentContainer';
import './component/palette';
import './component/dialPalette';

import RgbMixer from './color/rgbMixer';
import RgbComponent from './rgbComponent.js';
import DialComponent from './dialComponent';

const rgbMixer = new RgbMixer(0, 0, 0, 0);
const rgbNode = document.getElementById('rgbComponent');
const dialNode = document.getElementById('dialMixer');


new RgbComponent(rgbMixer, rgbNode);

new DialComponent(rgbMixer, dialNode);