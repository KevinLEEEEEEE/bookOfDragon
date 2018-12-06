// @ts-check

export default class BasinComponent {
  filter;
  component;

  constructor(filter, node) {
    this.filter = filter;

    this.component = node;
  }
}