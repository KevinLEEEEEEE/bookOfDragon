import { expect } from 'chai';
import ColorMixer from '../src/js/colorMixer/color/colorMixer';

describe('colorMixer', function() {
  describe('basic function', function() {
    it('should init colorMixer with rgb correctly', function() {
      const colorMixer = new ColorMixer(152, 174, 108, 30);
      const expectedRgb = { r: 152, g: 174, b: 108 };
      const expectedHsv = { h: 80, s: 37, v: 68 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgb);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsv);
    });

    it('should init colorMixer with incomplete rgb', function() {
      const colorMixer = new ColorMixer(152, 174);
      const expectedRgb = { r: 152, g: 174, b: 0 };
      const expectedHsv = { h: 67, s: 100, v: 68 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgb);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsv);
    });
  });

  describe('add color', function() {
    it('should add simple red color', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addRed(10);

      const expectedRgbAfter = { r: 176, g: 128, b: 75 };
      const expectedHsvAfter = { h: 31, s: 57, v: 69 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });

    it('should add simple green color', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addGreen(20);

      const expectedRgbAfter = { r: 90, g: 204, b: 60 };
      const expectedHsvAfter = { h: 107, s: 70, v: 80 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });


    it('should add simple green color', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addBlue(70);

      const expectedRgbAfter = { r: 45, g: 51, b: 209 };
      const expectedHsvAfter = { h: 237, s: 78, v: 81 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });
  });

  describe('add white / black', function() {
    it('should add simple white color', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addWhite(70);

      const expectedRgbAfter = { r: 203, g: 230, b: 135 };
      const expectedHsvAfter = { h: 77, s: 41, v: 90 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });

    it('should add simple black color', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addBlack(70);

      const expectedRgbAfter = { r: 45, g: 51, b: 30 };
      const expectedHsvAfter = { h: 77, s: 41, v: 20 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });
  });

  describe('add complex color and brightness', function() {
    it('should add multiple color', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addRed(10);

      const expectedRgbAfterRed = { r: 176, g: 128, b: 75 };
      const expectedHsvAfterRed = { h: 31, s: 57, v: 69 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterRed);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterRed);

      colorMixer.addBlue(5);

      const expectedRgbAfterBlue = { r: 156, g: 114, b: 95 };
      const expectedHsvAfterBlue = { h: 18, s: 39, v: 61 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterBlue);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterBlue);

      colorMixer.addGreen(5);

      const expectedRgbAfterGreen = { r: 140, g: 128, b: 86 };
      const expectedHsvAfterGreen = { h: 46, s: 38, v: 54 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterGreen);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterGreen);
    });

    it('should add multiple black / white', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addWhite(20);

      const expectedRgbAfterRed = { r: 180, g: 204, b: 120 };
      const expectedHsvAfterRed = { h: 77, s: 41, v: 80 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterRed);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterRed);

      colorMixer.addBlack(50);

      const expectedRgbAfterBlue = { r: 90, g: 102, b: 60 };
      const expectedHsvAfterBlue = { h: 77, s: 41, v: 40 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterBlue);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterBlue);
    });

    it('should add color after adjust brightness', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addWhite(20);

      const expectedRgbAfterRed = { r: 180, g: 204, b: 120 };
      const expectedHsvAfterRed = { h: 77, s: 41, v: 80 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterRed);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterRed);

      colorMixer.addGreen(50);

      const expectedRgbAfterBlue = { r: 90, g: 230, b: 60 };
      const expectedHsvAfterBlue = { h: 109, s: 73, v: 90 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterBlue);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterBlue);
    });

    it('should add color before adjust brightness', function() {
      const colorMixer = new ColorMixer(150, 170, 100, 30);
      const expectedRgbBefore = { r: 150, g: 170, b: 100 };
      const expectedHsvBefore = { h: 77, s: 41, v: 66 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.addRed(10);

      const expectedRgbAfterRed = { r: 176, g: 128, b: 75 };
      const expectedHsvAfterRed = { h: 31, s: 57, v: 69 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterRed);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterRed);

      colorMixer.addWhite(10);

      const expectedRgbAfterBlue = { r: 191, g: 139, b: 82 };
      const expectedHsvAfterBlue = { h: 31, s: 57, v: 75 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfterBlue);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfterBlue);
    });
  });

  describe('reduce color', function() {
    it('should reduce simple color', function() {
      const colorMixer = new ColorMixer(176, 128, 75, 40);
      const expectedRgbBefore = { r: 176, g: 128, b: 75 };
      const expectedHsvBefore = { h: 31, s: 57, v: 69 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.reduceRed(10);

      const expectedRgbAfter = { r: 150, g: 171, b: 100 }; // Math.round cause unexpected change
      const expectedHsvAfter = { h: 77, s: 41, v: 67 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });

    it('should convert too much reduce to reduce to 0', function() {
      const colorMixer = new ColorMixer(0, 0, 0, 0);

      colorMixer.addRed(20);

      colorMixer.addGreen(30);

      const expectedRgbBefore = { r: 102, g: 153, b: 0 }; // Math.round cause unexpected change
      const expectedHsvBefore = { h: 80, s: 100, v: 60 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.reduceRed(40);

      const expectedRgbAfter = { r: 0, g: 255, b: 0 }; // Math.round cause unexpected change
      const expectedHsvAfter = { h: 120, s: 100, v: 100 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });

    it('should convert too much reduce to reduce to 0', function() {
      const colorMixer = new ColorMixer(0, 0, 0, 0);

      colorMixer.addRed(20);

      colorMixer.addGreen(30);

      const expectedRgbBefore = { r: 102, g: 153, b: 0 }; // Math.round cause unexpected change
      const expectedHsvBefore = { h: 80, s: 100, v: 60 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbBefore);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvBefore);

      colorMixer.reduceRed(40);

      const expectedRgbAfter = { r: 0, g: 255, b: 0 }; // Math.round cause unexpected change
      const expectedHsvAfter = { h: 120, s: 100, v: 100 };

      expect(colorMixer.getRgb()).to.be.deep.equal(expectedRgbAfter);
      expect(colorMixer.getHsv()).to.be.deep.equal(expectedHsvAfter);
    });
  });

  describe('reduce complex color and brightness', function() {
    it('reduce color after ajust brightness', function() {

    });
  });
});