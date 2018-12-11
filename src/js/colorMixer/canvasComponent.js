// @ts-check

export default class CanvasComponent {
  filter;
  openBtn;
  closeBtn;
  component;
  shadeCanvas;

  constructor(filter, node, openBtn, closeBtn) {
    this.filter = filter;

    this.component = node;

    this.openBtn = openBtn;

    this.closeBtn = closeBtn;

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

    this.openBtn.addEventListener('click', this.displayToggle, false);

    this.closeBtn.addEventListener('click', this.displayToggle, false);
  }

  removeEvents() {
    this.shadeCanvas.removeEventListener('reset', this.reset, false);

    this.shadeCanvas.removeEventListener('fade', this.fade, false);

    this.openBtn.removeEventListener('click', this.displayToggle, false);

    this.closeBtn.removeEventListener('click', this.displayToggle, false);
  }

  reset = (e) => {
    e.stopPropagation();

    console.log('canvas event, color reset');

    this.filter.resetSaturationAmplify();
  }

  fade = (e) => {
    e.stopPropagation();

    console.log('canvas event, color fade');

    this.filter.setSaturationAmplify(-1);
  }

  displayToggle = () => {
    this.component.classList.toggle('invisible');
  }

  update() {
    this.updateCanvasFillColor(this.filter.getRgb());
  }

  updateCanvasFillColor({ r, g, b }) {
    this.shadeCanvas.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
  }
}