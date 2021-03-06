// @ts-check

import '../../css/main.css';
import '../../css/star.css';
import '../../css/pigment.css';

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
import './component/sky';

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
import SkyComponent from './skyComponent';

// const rgbNode = document.getElementById('rgbComponent');
// const dialNode = document.getElementById('dialMixer');
// const basin = document.getElementById('basin');
// const lamp = document.getElementById('lamp');
const shadeCanvas = document.getElementById('shadeCanvas');
const cvsOpenBtn = document.getElementById('draftBookOpen');
const cvsCloseBtn = document.getElementById('draftBookClose');
const littlePrince = document.getElementById('littlePrince');
const moon = document.getElementById('moon');
const stars = document.getElementById('stars');
const sky = document.getElementById('sky');

const rgbMixer = new RgbMixer(0, 0, 0, 0);
const hsvFilter = new HsvFilter(rgbMixer);

new LittlePrinceComponent(rgbMixer, littlePrince);

new MoonComponent(hsvFilter, moon);

new StarCompoment(hsvFilter, stars);

new SkyComponent(littlePrince, sky);

new CanvasComponent(hsvFilter, shadeCanvas, cvsOpenBtn, cvsCloseBtn);

// new RgbComponent(rgbMixer, rgbNode);

// new DialComponent(rgbMixer, dialNode);

// new BasinComponent(hsvFilter, basin);

// new LampComponent(hsvFilter, lamp);