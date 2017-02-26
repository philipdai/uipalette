export function rgbToHsl (r, g, b) {
  var d, h, l, max, min, s;
  r /= 255;
  g /= 255;
  b /= 255;
  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  h = 0;
  s = 0;
  l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  h = Math.ceil(h * 360);
  s = (Math.ceil(s * 100)) + "%";
  l = (Math.ceil(l * 100)) + "%";
  return [h, s, l];
};

export function hexToRgb (hex) {
  if (hex.charAt && hex.charAt(0) === '#') {
    hex = removeHash(hex)
  }

  if (hex.length === 3) {
    hex = expand(hex)
  }

  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return [r, g, b]
}

function removeHash (hex) {
  var arr = hex.split('')
  arr.shift()
  return arr.join('')
}

function expand (hex) {
  return hex
    .split('')
    .reduce(function (accum, value) {

      return accum.concat([value, value])
    }, [])
    .join('')
}

export function hexToHsl(hex) {
  var hsl = rgbToHsl.apply(rgbToHsl, hexToRgb(hex));
  return [hsl[0], parseInt(hsl[1], 10), parseInt(hsl[2], 10)];
};
