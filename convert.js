const asciiChar = `░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^\`'. `;
const charLen = asciiChar.length;
const showHeight = 30;
const showWidth = 90;

const calcGray = ([b, g, r]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const calcChar = (gray) => asciiChar[parseInt(gray / 256 * charLen)];

const convert = (frame) => {
  const rows = frame.rows;
  const cols = frame.cols;
  let text = '';
  for (let i = 0; i < showHeight; i++) {
    const y = parseInt(i * rows / showHeight);
    for (let j = 0; j < showWidth; j++) {
      const x = parseInt(j * cols / showWidth);
      const gray = calcGray(frame.atRaw(y, x));
      const char = calcChar(gray);
      text += char;
    }
    if (i < showHeight - 1) text += '\n';
  }
  return text;
}

const convertJPG = (rawImageData) => {
  const rows = rawImageData.height;
  const cols = rawImageData.width;
  let text = '';
  for (let i = 0; i < showHeight; i++) {
    const y = parseInt(i * rows / showHeight);
    for (let j = 0; j < showWidth; j++) {
      const x = parseInt(j * cols / showWidth);
      const base = y * cols * 3 + x * 3;
      const r = rawImageData.data[0 + base];
      const g = rawImageData.data[1 + base];
      const b = rawImageData.data[2 + base];
      const gray = calcGray([b, g, r]);
      const char = calcChar(gray);
      text += char;
    }
    if (i < showHeight - 1) text += '\n';
  }
  return text;
}

module.exports = {
  convert,
  convertJPG,
}