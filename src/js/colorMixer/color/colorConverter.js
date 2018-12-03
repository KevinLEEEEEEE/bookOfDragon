
export default class ColorConverter {
  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {string} string of hex like #000000
   */
  rgbToHex(r = 0, g = 0, b = 0) {
    r = this._limitValueBetween(r, 255, 0);
    g = this._limitValueBetween(g, 255, 0);
    b = this._limitValueBetween(b, 255, 0);

    return '#' + this._componentToHex(r) + this._componentToHex(g) + this._componentToHex(b);
  }

  _componentToHex(component) {
    const hex = component.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * @param {string} hex
   * @returns {{r: number, g: number, b: number}}
   */
  hexToRgb(hex = '#000000') {
    const hexSplitRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

    const splittedHex = hexSplitRegex.exec(hex); // #aacc33 => ["aa", "cc", "33"]

    return this._getRgbFromSplittedHex(splittedHex);
  }

  _getRgbFromSplittedHex(splittedHex) {
    return splittedHex ? {
      r: parseInt(splittedHex[1], 16),
      g: parseInt(splittedHex[2], 16),
      b: parseInt(splittedHex[3], 16),
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {{h: number, s: number, v: number}}
   */
  rgbToHsv(r = 0, g = 0, b = 0) {
    r = this._limitValueBetween(r, 255, 0);
    g = this._limitValueBetween(g, 255, 0);
    b = this._limitValueBetween(b, 255, 0);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const v = max / 255 * 100;
    const s = max === 0 ? 0 : (1 - min / max) * 100;
    const h = this._getHValue(r, g, b, min, max);

    return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
  }

  _getHValue(r, g, b, min, max) {
    switch (max) {
      case r:
        return 60 * (g - b) / (max - min) + (g >= b ? 0 : 360);
      case g:
        return 60 * (b - r) / (max - min) + 120;
      case b:
        return 60 * (r - g) / (max - min) + 240;
      default:
        return 0;
    }
  }

  /**
   * @param {number} h
   * @param {number} s
   * @param {number} v
   * @returns {{r: number, g: number, b: number}}
   */
  hsvToRgb(h = 0, s = 0, v = 0) {
    h = this._limitValueBetween(h, 360, 0);
    s = this._limitValueBetween(s, 100, 0) / 100;
    v = this._limitValueBetween(v, 100, 0) / 100;

    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r, g, b;

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  _limitValueBetween(value, max, min) {
    return value > max ? max : value < min ? min : value;
  }
}