// @ts-check

import ColorConverter from './colorConverter';
import observer from '../utils/observer';

@observer
export default class RgbMixer {
  rgb = { r: 0, g: 0, b: 0 };
  hsv;
  quantity = 0;
  colorConverter;

  constructor(r = 0, g = 0, b = 0, quantity) {
    this.colorConverter = new ColorConverter();

    this._mixColor(r, g, b, quantity);
  }

  /**
   * @returns {{ r: number, g: number, b: number }}
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

  /**
   * @returns {number}
   */
  getQuantity() {
    return this.quantity;
  }

  addRed(quantity) {
    this._mixColor(255, 0, 0, quantity);
  }

  addOrange(quantity) {
    this._mixColor(255, 127, 0, quantity);
  }

  addYellow(quantity) {
    this._mixColor(255, 255, 0, quantity);
  }

  addOlivine(quantity) { // 黄绿
    this._mixColor(127, 255, 0, quantity);
  }

  addGreen(quantity) {
    this._mixColor(0, 255, 0, quantity);
  }

  addViridity(quantity) { // 青绿
    this._mixColor(0, 255, 127, quantity);
  }

  addCyan(quantity) { // 青
    this._mixColor(0, 255, 255, quantity);
  }

  addIndigo(quantity) {
    this._mixColor(0, 127, 255, quantity);
  }

  addBlue(quantity) {
    this._mixColor(0, 0, 255, quantity);
  }

  addPurple(quantity) {
    this._mixColor(127, 0, 255, quantity);
  }

  addFuchsin(quantity) {
    this._mixColor(255, 0, 255, quantity);
  }

  addPurplishRed(quantity) {
    this._mixColor(255, 0, 127, quantity);
  }

  addWhite(quantity) {
    this._mixColor(255, 255, 255, quantity);
  }

  addBlack(quantity) {
    this._mixColor(0, 0, 0, quantity);
  }

  _mixColor(r, g, b, quantity = 0) {
    this._updateRgb(r, g, b, quantity);

    this._updateHsv();

    this._updateQuantity(quantity);

    // @ts-ignore
    this.notify();
  }

  _updateRgb(r, g, b, quantity) {
    const quantityBefore = this.quantity;
    const quantiyAfter = quantityBefore + quantity === 0 ? 0 : 1 / (quantityBefore + quantity);

    this.rgb = {
      r: Math.round((this.rgb.r * quantityBefore + r * quantity) * quantiyAfter),
      g: Math.round((this.rgb.g * quantityBefore + g * quantity) * quantiyAfter),
      b: Math.round((this.rgb.b * quantityBefore + b * quantity) * quantiyAfter)
    };
  }

  _updateHsv() {
    this.hsv = this.colorConverter.rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  _updateQuantity(quantity) {
    this.quantity += quantity;
  }
}