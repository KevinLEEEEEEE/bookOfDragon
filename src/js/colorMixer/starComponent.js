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
    this.component.addEventListener('twinkle', this.twinkle, false);
  }

  removeEvents() {
    this.component.removeEventListener('twinkle', this.twinkle, false);
  }

  twinkle = (e) => {
    const { value } = e.detail;

    e.stopPropagation();

    console.log('star event, color brightness');

    console.log(value);

    this.filter.setBrightnessAmplify(value * 10);
  }
}