const cv = require('opencv4nodejs');
const fs = require('fs');
const log = require('single-line-log').stdout;
const { convert } = require('./convert.js');

const grabFrames = (videoFile, onFrame) => {
  const cap = new cv.VideoCapture(videoFile);
  const intvl = setInterval(() => {
    let frame = cap.read();
    if (frame.empty) {
      clearInterval(intvl);
      fs.writeFileSync('./data/frames.json',JSON.stringify(frames));
    } else {
      onFrame(frame);
    }
  }, 0);
};

const src = './data/1.flv';
const frames = [];
const loading = `-\\|/`;
let count = 0;
grabFrames(src, frame => {
  const text = convert(frame);
  frames.push(text);
  log(loading[(count ++) % loading.length] + count);
});