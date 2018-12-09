// @ts-check

// import './component/pigmentContainer';
// import './component/palette';
// import './component/dialPalette';
// import './component/basin';
// import './component/lamp';
import './component/shadeCanvas';
import './component/pigment';
import './component/planet';
import './component/prince';
import './component/moon';
import './component/star';

// import RgbComponent from './rgbComponent.js';
// import DialComponent from './dialComponent';
// import BasinComponent from './basinComponent';
// import LampComponent from './lampComponent';
import RgbMixer from './color/rgbMixer';
import HsvFilter from './color/hsvFilter';
import CanvasComponent from './canvasComponent';
import LittlePrinceComponent from './littlePrinceComponent';
import MoonComponent from './moonComponent';
import StarCompoment from './starComponent';

// const rgbNode = document.getElementById('rgbComponent');
// const dialNode = document.getElementById('dialMixer');
// const basin = document.getElementById('basin');
// const lamp = document.getElementById('lamp');
const shadeCanvas = document.getElementById('shadeCanvas');
const canvasButton = document.getElementById('draftBook');
const littlePrince = document.getElementById('littlePrince');
const moon = document.getElementById('moon');
const stars = document.getElementById('stars');

const rgbMixer = new RgbMixer(0, 0, 0, 0);
const hsvFilter = new HsvFilter(rgbMixer);

new LittlePrinceComponent(rgbMixer, littlePrince);

new MoonComponent(hsvFilter, moon);

new StarCompoment(hsvFilter, stars);

new CanvasComponent(hsvFilter, shadeCanvas, canvasButton);

// new RgbComponent(rgbMixer, rgbNode);

// new DialComponent(rgbMixer, dialNode);

// new BasinComponent(hsvFilter, basin);

// new LampComponent(hsvFilter, lamp);