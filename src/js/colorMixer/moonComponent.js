// @ ts-check

export default class RgbComponent {
  mixer;
  moon;
  component;

  phase = 0;

  constructor(mixer, node) {
    this.mixer = mixer;

    this.component = node;

    this.initNode(node);

    this.mixer.register(this);

    this.update();
  }

  initNode(node) {
    this.moon = node.querySelector('simple-moon');
  }

  update() {
    this.updateColor();

    this.updatePhase();
  }

  updateColor() {
    const { r, g, b } = this.mixer.getRgb();

    this.moon.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
  }

  updatePhase() {
    const { h } = this.mixer.getHsv();
    let phase = Math.floor(h % 60);

    phase = phase === 6 ? 5 : phase;

    this.moon.setAttribute('phase', phase);
  }
}