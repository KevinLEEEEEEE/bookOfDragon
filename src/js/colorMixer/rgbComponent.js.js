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
    this.redPigment.addEventListener('click', this.addRed, false);
    this.greenPigment.addEventListener('click', this.addGreen, false);
    this.bluePigment.addEventListener('click', this.addBlue, false);
  }

  addRed = () => {
    this.mixer.addRed(10);
  }

  addGreen = () => {
    this.mixer.addGreen(10);
  }

  addBlue = () => {
    this.mixer.addBlue(10);
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