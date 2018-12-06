// @ts-check

import './component/pigment';
import './component/pigmentContainer';
import './component/palette';
import './component/dialPalette';
import './component/shadeCanvas';
import './component/basin';
import './component/lamp';

import RgbMixer from './color/rgbMixer';
import HsvFilter from './color/hsvFilter';
import RgbComponent from './rgbComponent.js';
import DialComponent from './dialComponent';
import CanvasComponent from './canvasComponent';
import BasinComponent from './basinComponent';
import LampComponent from './lampComponent';

const rgbMixer = new RgbMixer(0, 0, 0, 0);
const hsvFilter = new HsvFilter(rgbMixer);

const rgbNode = document.getElementById('rgbComponent');
const dialNode = document.getElementById('dialMixer');
const shadeCanvas = document.getElementById('shadeCanvas');
const basin = document.getElementById('basin');
const lamp = document.getElementById('lamp');

new RgbComponent(rgbMixer, rgbNode);

new DialComponent(rgbMixer, dialNode);

new CanvasComponent(hsvFilter, shadeCanvas);

new BasinComponent(hsvFilter, basin);

new LampComponent(hsvFilter, lamp);