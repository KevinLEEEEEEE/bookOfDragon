// @ts-check

import ColorConverter from './colorConverter';
import observer from '../utils/observer';

@observer
export default class RgbMixer { // hsv, currentHsv
  rgb;
  hsv;
  currentHsv;
  mixer;
  saturationAmplify = 0;
  brightnessAmplify = 0;
  colorConverter;

  constructor(mixer) {
    this.colorConverter = new ColorConverter();

    this.mixer = mixer;

    this.mixer.register(this);

    this.update();
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

  update() {
    const { h, s, v } = this.mixer.getHsv();

    this._mixColor(h, s, v);
  }

  /**
   * @param {number} value
   */
  setSaturationAmplify(value) {
    this.saturationAmplify = value;

    this._mixColor(this.hsv.h, this.hsv.s, this.hsv.v);
  }

  /**
   * @param {number} value
   */
  setSaturationAmplifyOnce(value) {
    this._mixColor(this.hsv.h, this.hsv.s + value, this.hsv.v);
  }

  /**
   * @param {number} value
   */
  setBrightnessAmplify(value) {
    this.brightnessAmplify = value;

    this._mixColor(this.hsv.h, this.hsv.s, this.hsv.v);
  }

  _mixColor(h, s, v) {
    this._updateHsv(h, s, v);

    this._updateRgb();

    // @ts-ignore
    this.notify();
  }

  _updateHsv(h, s, v) {
    s = this._limitValueBetween(s + this.saturationAmplify, 100, 0);
    v = this._limitValueBetween(v + this.brightnessAmplify, 100, 0);

    this.hsv = { h, s: Math.round(s), v: Math.round(v) };
  }

  _updateRgb() {
    this.rgb = this.colorConverter.hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v);
  }

  _limitValueBetween(value, max, min) {
    return value > max ? max : value < min ? min : value;
  }
}