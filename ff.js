const log = require('single-line-log').stdout;
const fs = require('fs');
const jpeg = require('jpeg-js');
const src = './data/1.flv';
const screenshotsPath = './screenshots';
const { deleteall, mkdirpSync } = require('./utils.js');
const type = 'jpg';
const { convertJPG } = require('./convert.js');

deleteall(screenshotsPath);

mkdirpSync(screenshotsPath);

const cp = require('child_process');

const ls = cp.exec(`ffmpeg -i ${src} -qscale:v 2 -f image2 ${screenshotsPath}/%08d.${type}`, {}/*options, [optional]*/);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code);
  main();
});


const frames = [];
const loading = `-\\|/`;
let count = 0;
function main() {
  const files = fs.readdirSync(screenshotsPath);
  files.forEach(file => {
    if (file.slice(-4) === '.' + type) {
      frames.push(makeText(file));
      log(loading[(count ++) % loading.length] + count);
    }
  });
  fs.writeFileSync('./data/frames_ff.json',JSON.stringify(frames));
}

function makeText(fileName) {
  const filePath = screenshotsPath + '/' + fileName;
  const jpegData = fs.readFileSync(filePath);
  const rawImageData = jpeg.decode(jpegData, {useTArray: true, formatAsRGBA: false});
  const text = convertJPG(rawImageData);
  return text;
}