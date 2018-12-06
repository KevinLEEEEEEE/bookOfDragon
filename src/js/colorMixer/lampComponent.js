// @ts-check

export default class LampComponent {
  filter;
  component;

  constructor(filter, node) {
    this.filter = filter;

    this.component = node;
  }
}