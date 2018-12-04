import ColorConverter from './colorConverter';

export default class ColorMixer {
  rgb;
  hsv;
  componentQuantity = { r: 0, g: 0, b: 0};
  grossQuantity = 0;
  colorConverter;

  constructor(r = 0, g = 0, b = 0, quantity = 0) {
    this.rgb = { r, g, b };

    this.colorConverter = new ColorConverter();

    this._updateHsvFromRgb();

    this._updateQuantity(r, g, b, quantity);
  }

  addRed(quantity = 0) {
    this._mixColor(255, 0, 0, quantity);
  }

  reduceRed(quantity = 0) {
    quantity = this._quantityValidator(this.componentQuantity.r, quantity);

    this._mixColor(255, 0, 0, -quantity);
  }

  addGreen(quantity = 0) {
    this._mixColor(0, 255, 0, quantity);
  }

  addBlue(quantity = 0) {
    this._mixColor(0, 0, 255, quantity);
  }

  addWhite(quantity = 0) {
    this._mixBrightness(100, quantity);
  }

  addBlack(quantity) {
    this._mixBrightness(0, quantity);
  }

  _quantityValidator(currentQuantity, quantity) {
    return currentQuantity - quantity < 0 ? currentQuantity : quantity;
  }

  _mixColor(r, g, b, quantity) {
    const quantityBefore = this.grossQuantity;
    const quantiyAfter = quantityBefore + quantity;

    const mixedr = (this.rgb.r * quantityBefore + r * quantity) / quantiyAfter;
    const mixedg = (this.rgb.g * quantityBefore + g * quantity) / quantiyAfter;
    const mixedb = (this.rgb.b * quantityBefore + b * quantity) / quantiyAfter;

    this.rgb = { r: Math.round(mixedr), g: Math.round(mixedg), b: Math.round(mixedb) };

    this._updateHsvFromRgb();

    this._updateQuantity(r, g, b, quantity);
  }

  _mixBrightness(b, quantity) {
    const quantityBefore = this.grossQuantity;
    const quantiyAfter = quantityBefore + quantity;

    const mixedb = (this.hsv.v * quantityBefore + b * quantity) / quantiyAfter;

    this.hsv.v = Math.round(mixedb);

    this._updateRgbFromHsv();

    this._updateQuantity(0, 0, 0, quantity);
  }

  _updateHsvFromRgb() {
    this.hsv = this.colorConverter.rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  _updateRgbFromHsv() {
    this.rgb = this.colorConverter.hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v);
  }

  _updateQuantity(r, g, b, quantity) {
    const total = r + g + b === 0 ? 0 : Math.abs(1 / (r + g + b));

    this.componentQuantity.r += r * total * quantity;
    this.componentQuantity.g += g * total * quantity;
    this.componentQuantity.b += b * total * quantity;

    this.grossQuantity += quantity;
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

  /**
   * @returns {number}
   */
  getGrossQuantity() {
    return this.grossQuantity;
  }
}