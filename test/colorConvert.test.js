import { expect } from 'chai';
import ColorConverter from '../src/js/colorMixer/color/colorConverter';

describe('colorConvert', function() {
  const converter = new ColorConverter();

  describe('rgbToHex', function() {
    it('should convert basic rgb to hex', function() {
      const input = { r: 152, g: 174, b: 108 };
      const expected = '#98ae6c';
      const res = converter.rgbToHex(input.r, input.g, input.b);

      expect(res).to.be.equal(expected);
    });

    it('should fill incomplete rgb with 0', function() {
      const input = { r: 152, g: 174, b: 108 };
      const expected3 = '#98ae6c';
      const expected2 = '#98ae00';
      const expected1 = '#980000';
      const res3 = converter.rgbToHex(input.r, input.g, input.b);
      const res2 = converter.rgbToHex(input.r, input.g);
      const res1 = converter.rgbToHex(input.r);

      expect(res3).to.be.equal(expected3);
      expect(res2).to.be.equal(expected2);
      expect(res1).to.be.equal(expected1);
    });

    it('should convert rgb more than 255 to 255', function() {
      const input = { r: 152, g: 320, b: 108 };
      const expected = '#98ff6c';
      const res = converter.rgbToHex(input.r, input.g, input.b);

      expect(res).to.be.equal(expected);
    });

    it('should convert rgb less than 0 to 0', function() {
      const input = { r: 152, g: -53, b: 108 };
      const expected = '#98006c';
      const res = converter.rgbToHex(input.r, input.g, input.b);

      expect(res).to.be.equal(expected);
    });
  });

  describe('hexToRgb', function() {
    it('should convert basic hex to rgb', function() {
      const input = '#98ae6c';
      const expected = { r: 152, g: 174, b: 108 };
      const res = converter.hexToRgb(input);

      expect(res).to.be.deep.equal(expected);
    });

    it('should convert invalid hex to 0', function() {
      const input = '#98zz34';
      const expected = { r: 0, g: 0, b: 0 };
      const res = converter.hexToRgb(input);

      expect(res).to.be.deep.equal(expected);
    });
  });

  describe('rgbToHsv', function() {
    it('should convert basic rgb to hsv', function() {
      const input = { r: 152, g: 174, b: 108 };
      const expected = { h: 80, s: 38, v: 68 };
      const res = converter.rgbToHsv(input.r, input.g, input.b);

      expect(res).to.be.deep.equal(expected);
    });

    it('should convert rgb more than 255 to 255', function() {
      const input = { r: 152, g: 320, b: 108 };
      const expected = { h: 102, s: 58, v: 100 };
      const res = converter.rgbToHsv(input.r, input.g, input.b);

      expect(res).to.be.deep.equal(expected);
    });

    it('should convert rgb less than 0 to 0', function() {
      const input = { r: 152, g: 0, b: 108 };
      const expected = { h: 317, s: 100, v: 60 };
      const res = converter.rgbToHsv(input.r, input.g, input.b);

      expect(res).to.be.deep.equal(expected);
    });
  });

  describe('hsvToRgb', function() {
    it('should convert basic hsv to rgb', function() {
      const input = { h: 180, s: 38, v: 68 };
      const expected = { r: 108, g: 173, b: 173 };
      const res = converter.hsvToRgb(input.h, input.s, input.v);

      expect(res).to.be.deep.equal(expected);
    });

    it('should convert hsv more than 360/100 to 360/100', function() {
      const input = { h: 520, s: 158, v: 68 };
      const expected = { r: 173, g: 0, b: 0 };
      const res = converter.hsvToRgb(input.h, input.s, input.v);

      expect(res).to.be.deep.equal(expected);
    });

    it('should convert hsv less than 0 to 0', function() {
      const input = { h: -52, s: -38, v: 68 };
      const expected = { r: 173, g: 173, b: 173 };
      const res = converter.hsvToRgb(input.h, input.s, input.v);

      expect(res).to.be.deep.equal(expected);
    });
  });
});
