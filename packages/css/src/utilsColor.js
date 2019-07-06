// h 色相
// s 饱和度
// b(v) 亮度
// 十六进制转rgb
/*
 * by wangcuixia
 * @flow
 * */
const { colors } = require('./colorTable.js');
const hexColorRegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
const regWord = /^[a-zA-Z]*$/;

function colorIsWorrd(sHex) {
  const newHex = sHex.toLowerCase();
  const item = colors.find(
    ({ englishName }) => newHex === englishName.toLowerCase(),
  );
  return {
    hex: item ? item.Hex : undefined,
    state: !!item,
  };
}

export function colorRgb(sHex: string): Array<number> {
  let hexColor = sHex;
  const isWord = regWord.test(sHex);
  if (sHex && isWord) {
    const { hex, state } = colorIsWorrd(sHex);
    if (!state) {
      return [255, 255, 255];
    }
    hexColor = hex || '';
  }
  let sColor = hexColor && hexColor.toLowerCase();
  // 如果是16进制颜色
  if (sColor && hexColorRegExp.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        const colorSlice = sColor.slice(i, i + 1);
        sColorNew += colorSlice.concat(colorSlice);
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i <= 6; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return sColorChange;
    // return "RGB(" + sColorChange.join(",") + ")";
  }
  return [255, 255, 255];
}

function rgb2hsb(
  rgbR?: number = 0,
  rgbG?: number = 0,
  rgbB?: number = 0,
  reduceS?: number = 0,
  reduceB?: number = 0,
): [number, number, number] {
  const max = Math.max(rgbR, rgbG, rgbB);
  const min = Math.min(rgbR, rgbG, rgbB);
  const hsbB = max / 255.0 - reduceB;
  const hsbS = (max === 0 ? 0 : (max - min) / max) - reduceS;
  let hsbH = 0;
  const publicFormula = ((rgbG - rgbB) * 60) / (max - min);
  if (max === rgbR) {
    hsbH = rgbG >= rgbB ? publicFormula : publicFormula + 360;
  } else if (max === rgbG) {
    hsbH = ((rgbB - rgbR) * 60) / (max - min) + 120;
  } else if (max === rgbB) {
    hsbH = ((rgbR - rgbG) * 60) / (max - min) + 240;
  }

  return [hsbH, hsbS, hsbB];
}

export function hsb2rgb(h: number, s: number, v: number): Object {
  let r = 0,
    g = 0,
    b = 0;
  const i = parseInt((h / 60) % 6);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  return { newR: r, newG: g, newB: b };
}

export function colorHex(rgb: string): string {
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(rgb)) {
    const aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    let strHex = '#';
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = rgb;
    }
    return strHex;
  } else if (hexColorRegExp.test(rgb)) {
    const aNum = rgb.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return rgb;
    } else if (aNum.length === 3) {
      let numHex = '#';
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  }
  return rgb;
}
export default function getColor(
  sHex?: string = '#684fff',
  reduceS?: number = 0,
  reduceB?: number = 0,
  reduceA?: number = 100,
): Object {
  reduceS /= 100;
  reduceB /= 100;
  reduceA /= 100;
  const { newR, newG, newB } = hsb2rgb(
    ...rgb2hsb(...colorRgb(sHex), reduceS, reduceB),
  );
  const rgb = `rgb(${newR},${newG},${newB})`;
  const color = colorHex(rgb);
  const rgba = `rgba(${newR},${newG},${newB},${reduceA})`;
  return {
    color,
    opacity: reduceA,
    rgb,
    rgba,
  };
}
