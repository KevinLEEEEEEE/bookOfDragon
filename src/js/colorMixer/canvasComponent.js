// @ts-check

export default class CanvasComponent {
  filter;
  component;
  shadeCanvas;

  constructor(filter, node) {
    this.filter = filter;

    this.component = node;

    this.initNode();

    this.addEvents();

    this.filter.register(this);
  }

  initNode() {
    this.shadeCanvas = this.component.querySelector('shade-canvas');
  }

  addEvents() {
    this.shadeCanvas.addEventListener('reset', this.reset, false);

    this.shadeCanvas.addEventListener('fade', this.fade, false);
  }

  removeEvents() {
    this.shadeCanvas.removeEventListener('reset', this.reset, false);
  }

  reset = (e) => {
    e.stopPropagation();

    this.filter.setSaturationAmplifyOnce(100);
  }

  fade = (e) => {
    e.stopPropagation();

    this.filter.setSaturationAmplify(-1);
  }

  update() {
    this.updateCanvasFillColor(this.filter.getRgb());
  }

  updateCanvasFillColor({ r, g, b }) {
    this.shadeCanvas.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
  }
}