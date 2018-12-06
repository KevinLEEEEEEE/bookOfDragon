// @ts-check

export default class BasinComponent {
  filter;
  component;

  constructor(filter, node) {
    this.filter = filter;

    this.component = node;

    this.addEvents();
  }

  addEvents() {
    this.component.addEventListener('basin', this.fade, false);
  }

  removeEvents() {
    this.component.removeEventListener('basin', this.fade, false);
  }

  fade = (e) => {
    const { value } = e.detail;

    e.stopPropagation();

    this.filter.setSaturationAmplifyOnce(value);
  }
}