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
const cvsOpenBtn = document.getElementById('draftBookOpen');
const cvsCloseBtn = document.getElementById('draftBookClose');
const littlePrince = document.getElementById('littlePrince');
const moon = document.getElementById('moon');
const stars = document.getElementById('stars');

const rgbMixer = new RgbMixer(0, 0, 0, 0);
const hsvFilter = new HsvFilter(rgbMixer);

new LittlePrinceComponent(rgbMixer, littlePrince);

new MoonComponent(hsvFilter, moon);

new StarCompoment(hsvFilter, stars);

new CanvasComponent(hsvFilter, shadeCanvas, cvsOpenBtn, cvsCloseBtn);

// new RgbComponent(rgbMixer, rgbNode);

// new DialComponent(rgbMixer, dialNode);

// new BasinComponent(hsvFilter, basin);

// new LampComponent(hsvFilter, lamp);

const moonCanvas = document.getElementById('moonCanvas');
// @ts-ignore
const moonContext = moonCanvas.getContext('2d');

const moonRadius = 200;

const getCircleFromX = (x, radius) => {
  const centerPointXOfMusk = (2 * radius ** 2 - x ** 2) / (2 * radius - 2 * x);
  const radiusOfMusk = Math.abs(centerPointXOfMusk - x);
  const halfRadianOfMusk = Math.asin(radius / radiusOfMusk);
  const startAngle = Math.PI - halfRadianOfMusk;
  const endAngle = Math.PI + halfRadianOfMusk;

  return { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle };
};

function drawMoon(x, radius) {
  const { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle } = getCircleFromX(x, moonRadius);

  moonContext.beginPath();
  moonContext.arc(centerPointXOfMusk, 200, radiusOfMusk, startAngle, endAngle, x >= radius);
  moonContext.arc(200, 200, radius, 1.5 * Math.PI, 0.5 * Math.PI, true);
  moonContext.fillStyle = 'red';
  moonContext.fill();
}

drawMoon(100, moonRadius);