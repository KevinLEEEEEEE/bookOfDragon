// @ ts-check

import capital from './utils/capital';

export default class RgbComponent {
  mixer;
  palette;
  component;
  redPigment;
  greenPigment;
  bluePogment;

  constructor(mixer, node) {
    this.mixer = mixer;

    this.component = node;

    this.initNode(node);

    this.addEvents();

    this.mixer.register(this);

    this.update();
  }

  initNode(node) {
    this.palette = node.querySelector('simple-palette');
  }

  addEvents() {
    this.component.addEventListener('squeeze', this.addColor, false);
  }

  addColor = (e) => {
    const { color, quantity } = e.detail;

    e.stopPropagation();

    console.log('rgb component event, color squeeze');

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
    if (quantity <= 1500) {
      return (-0.7 / (1500 ** 2)) * (quantity ** 2) + (1.4 / 1500) * quantity + 0.3;
    }

    return 1;
  }
}