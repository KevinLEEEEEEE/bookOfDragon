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
    return this.currentHsv;
  }

  update() {
    this.hsv = this.mixer.getHsv();

    this._mixColor();
  }

  /**
   * @param {number} value
   */
  setSaturationAmplify(value) {
    this.saturationAmplify += Math.round(value);

    this._mixColor();
  }

  resetSaturationAmplify() {
    this.saturationAmplify = 0;

    this._mixColor();
  }

  /**
   * @param {number} value
   */
  setBrightnessAmplify(value) {
    this.brightnessAmplify += Math.round(value);

    this._mixColor();
  }

  resetBrightnessAmplify() {
    this.brightnessAmplify = 0;

    this._mixColor();
  }


  _mixColor() {
    this._updateHsv();

    this._updateRgb();

    console.log(`update hsv filter to h: ${this.hsv.h}, s: ${this.hsv.s}, v: ${this.hsv.v}`);

    // @ts-ignore
    this.notify();
  }

  _updateHsv() {
    const h = this.hsv.h;
    const s = this._limitValueBetween(this.hsv.s + this.saturationAmplify, 100, 0);
    const v = this._limitValueBetween(this.hsv.v + this.brightnessAmplify, 100, 0);

    this.currentHsv = { h, s, v };
  }

  _updateRgb() {
    this.rgb = this.colorConverter.hsvToRgb(this.currentHsv.h, this.currentHsv.s, this.currentHsv.v);
  }

  _limitValueBetween(value, max, min) {
    return value > max ? max : value < min ? min : value;
  }
}