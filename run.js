const frames = require('./data/frames_ff.json');
// const frames = require('./data/frames.json');
const len = frames.length;
const log = require('single-line-log').stdout;
const ms = 1000 / 30;
let count = 0;
let interval = setInterval(() => {
  log(frames[count ++]);
  if (count === len) clearInterval(interval);
}, ms);