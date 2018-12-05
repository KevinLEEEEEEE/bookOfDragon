// @ts-check

import ColorConverter from './colorConverter';

export default class RgbMixer {
  rgb;
  hsv;
  colorConverter;

  constructor(h = 0, s = 0, v = 0) {
    this.colorConverter = new ColorConverter();

    this._mixColor(h, s, v);
  }

  /**
   * @returns {{ r: number, g: number, b: numebr }}
   */
  getRgb() {
    return this.rgb;
  }

  /**
   * @returns {{ h: number, s: number, v: number }}
   */
  getHsv() {
    return this.hsv;
  }


  _mixColor(r, g, b, quantity = 0) {
    this._updateRgb(r, g, b, quantity);

    this._updateHsv();

    // this._updateQuantity(quantity);
  }

  _updateRgb(r, g, b, quantity) {
    // const quantityBefore = this.quantity;
    // const quantiyAfter = quantityBefore + quantity === 0 ? 0 : 1 / (quantityBefore + quantity);

    // this.rgb = {
    //   r: Math.round((this.rgb.r * quantityBefore + r * quantity) * quantiyAfter),
    //   g: Math.round((this.rgb.g * quantityBefore + g * quantity) * quantiyAfter),
    //   b: Math.round((this.rgb.b * quantityBefore + b * quantity) * quantiyAfter)
    // };
  }

  _updateHsv() {
    this.hsv = this.colorConverter.rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b);
  }
}