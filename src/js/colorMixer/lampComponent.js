// @ts-check

export default class LampComponent {
  filter;
  component;

  constructor(filter, node) {
    this.filter = filter;

    this.component = node;

    this.addEvents();
  }

  addEvents() {
    this.component.addEventListener('lamp', this.lamp, false);
  }

  removeEvents() {
    this.component.removeEventListener('lamp', this.lamp, false);
  }

  lamp = (e) => {
    const { level } = e.detail;

    e.stopPropagation();

    this.filter.setSaturationAmplify(level);
  }
}