const fs = require('fs');
const mkdirp = require('mkdirp');

function deleteall(path) {
  let files = [];
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file) {
      const curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) {
        deleteall(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
    console.log(`   \x1b[36m clear success: ${path} \x1b[0m `);
  }
};

function mkdirpSync(path) {
  try {
    mkdirp.sync(path);
    console.log(`   \x1b[36m create success: ${path} \x1b[0m `);
  } catch (e) {
    console.error(e);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

module.exports = {
  deleteall,
  mkdirpSync,
  sleep,
}