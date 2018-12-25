// @ ts-check


export default class SkyComponent {
  prince;
  component;
  sky;

  constructor(prince, node) {
    this.prince = prince;

    this.component = node;

    this.initNode(node);

    this.addEvents();

    this.updateSize();
  }

  initNode(node) {
    this.sky = node.querySelector('simple-sky');
  }

  addEvents() {
    this.prince.addEventListener('running', this.updateSky);

    window.addEventListener('resize', this.updateSize);
  }

  removeEvents() {
    this.prince.removeEventListener('running', this.updateSky);

    window.removeEventListener('resize', this.updateSize);
  }

  updateSky = (e) => {
    const { state } = e.detail;

    this.sky.setAttribute('move', state);
  }

  updateSize = () => {
    const { innerWidth, innerHeight } = window;

    this.sky.setAttribute('width', innerWidth);

    this.sky.setAttribute('height', innerHeight);
  }
}