const cv = require('opencv4nodejs');
const log = require('single-line-log').stdout;
const { convert } = require('./convert.js');

const grabFrames = (videoFile, delay, onFrame) => {
  const cap = new cv.VideoCapture(videoFile);
  let done = false;
  const intvl = setInterval(() => {
    let frame = cap.read();
    if (frame.empty) {
      clearInterval(intvl);
      console.log('finish, exiting.');
    }
    onFrame(frame);

    const key = cv.waitKey(delay);
    done = key !== -1 && key !== 255;
    if (done) {
      clearInterval(intvl);
      console.log('Key pressed, exiting.');
    }
  }, 1000/30);
};

// const src = './data/1.flv';
const src = 0;

grabFrames(src, 1, frame => {
  const text = convert(frame);
  log(text);
});