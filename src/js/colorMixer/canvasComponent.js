// @ts-check

export default class CanvasComponent {
  filter;
  component;
  shadeCanvas;

  constructor(filter, node) {
    this.filter = filter;

    this.component = node;

    this.initNode(node);

    this.filter.register(this);
  }

  initNode(node) {
    this.shadeCanvas = node.querySelector('shade-canvas');
  }

  addEvents() {
    this.shadeCanvas.addEventListener('fade', this.fade, false);
  }

  fade = () => {
    this.filter.setSaturationAmplify(-0.1);
  }

  update() {
    console.log('update');

    console.log(this.filter.getRgb());
  }
}