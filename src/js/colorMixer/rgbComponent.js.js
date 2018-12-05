import capital from './utils/capital';

export default class rgbComponent {
  mixer;
  palette;
  redPigment;
  greenPigment;
  bluePogment;

  constructor(mixer, node) {
    this.mixer = mixer;

    this.initNode(node);

    this.addEvents();

    this.mixer.register(this);

    this.update();
  }

  initNode(node) {
    const pigments = node.querySelectorAll('pigment-container');
    this.palette = node.querySelector('simple-palette');

    this.redPigment = pigments[0];
    this.greenPigment = pigments[1];
    this.bluePigment = pigments[2];
  }

  addEvents() {
    this.redPigment.addEventListener('squeeze', this.addColor, false);
    this.greenPigment.addEventListener('squeeze', this.addColor, false);
    this.bluePigment.addEventListener('squeeze', this.addColor, false);
  }

  addColor = (e) => {
    const { color, quantity } = e.detail;

    try {
      this.mixer[`add${capital(color)}`](quantity);
    } catch (err) {
      console.log(err);
    }
  }

  update() {
    this.updateColor();

    this.updateSize();
  }

  updateColor() {
    const { r, g, b } = this.mixer.getRgb();

    this.palette.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
  }

  updateSize() {
    const quantity = this.mixer.getQuantity();
    const ratio = this.getScaleRatioFronQuantity(quantity);

    this.palette.setAttribute('scale', ratio);
  }

  getScaleRatioFronQuantity(quantity) {
    return Math.log(quantity + 1) / 10 + 0.1; // fix required
  }
}