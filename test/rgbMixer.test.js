import { expect } from 'chai';
import RgbMixer from '../src/js/colorMixer/color/rgbMixer';

describe('rgbMixer', function() {
  describe('basic function', function() {
    it('should init rgbMixer with rgb correctly', function() {
      const rgbMixer = new RgbMixer(152, 174, 108, 30);
      const expectedRgb = { r: 152, g: 174, b: 108 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgb);
    });

    it('should init rgbMixer with incomplete rgb', function() {
      const rgbMixer = new RgbMixer(152, 174, null, 30);
      const expectedRgb = { r: 152, g: 174, b: 0 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgb);
    });
  });

  describe('add color', function() {
    it('should add simple red color', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addRed(10);

      const expectedRgbAfter = { r: 176, g: 128, b: 75 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
    });

    it('should add simple green color', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addGreen(20);

      const expectedRgbAfter = { r: 90, g: 204, b: 60 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
    });

    it('should add simple green color', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addBlue(70);

      const expectedRgbAfter = { r: 45, g: 51, b: 209 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
    });
  });

  describe('add white / black', function() {
    it('should add simple white color', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addWhite(70);

      const expectedRgbAfter = { r: 224, g: 230, b: 209 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
    });

    it('should add simple black color', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addBlack(70);

      const expectedRgbAfter = { r: 45, g: 51, b: 30 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
    });
  });

  describe('add complex color', function() {
    it('should add multiple color', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addRed(10);

      const expectedRgbAfterRed = { r: 176, g: 128, b: 75 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfterRed);

      rgbMixer.addBlue(5);

      const expectedRgbAfterBlue = { r: 156, g: 114, b: 95 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfterBlue);

      rgbMixer.addGreen(5);

      const expectedRgbAfterGreen = { r: 140, g: 128, b: 86 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfterGreen);
    });

    it('should add multiple black / white', function() {
      const rgbMixer = new RgbMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);

      rgbMixer.addWhite(20);

      const expectedRgbAfterRed = { r: 192, g: 204, b: 162 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfterRed);

      rgbMixer.addBlack(50);

      const expectedRgbAfterBlue = { r: 96, g: 102, b: 81 };

      expect(rgbMixer.getRgb()).to.be.deep.equal(expectedRgbAfterBlue);
    });
  });
});