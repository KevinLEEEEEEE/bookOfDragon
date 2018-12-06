// @ts-check

import ColorConverter from './colorConverter';
import observer from '../utils/observer';

@observer
export default class RgbMixer { // hsv, currentHsv
  rgb;
  hsv;
  currentHsv;
  mixer;
  saturation = 1;
  brightness = 1;
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
   * @param {number} percentage
   */
  setSaturationAmplify(percentage) {
    this.saturation += percentage;

    this._mixColor(this.hsv.h, this.hsv.s, this.hsv.v);
  }

  /**
   * @param {number} percentage
   */
  setBrightnessAmplify(percentage) {
    this.brightness += percentage;

    this._mixColor(this.hsv.h, this.hsv.s, this.hsv.v);
  }

  _mixColor(h, s, v) {
    this._updateHsv(h, s, v);

    this._updateRgb();

    // @ts-ignore
    this.notify();
  }

  _updateHsv(h, s, v) {
    s = s * this.saturation > 100 ? 100 : s * this.saturation;
    v = v * this.brightness > 100 ? 100 : v * this.brightness;

    this.hsv = { h, s: Math.round(s), v: Math.round(v) };
  }

  _updateRgb() {
    this.rgb = this.colorConverter.hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v);
  }
}