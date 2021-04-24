// const files = require.context(".", false, /.mp3$/);
// const steps = files.keys().reduce((obj, path) => {
//   const name = path.replace(/^\.\/步序改变维(.*)\.mp3/, "$1");
//   obj[name] = files(path);
//   return obj;
// }, {});
const files = import.meta.globEager("./*.mp3");

const steps = Object.keys(files).reduce((obj, item) => {
  const key = item.replace(/^\.\/步序改变维(.*)\.mp3$/, "$1");
  obj[key] = files[item].default;
  return obj;
}, {});

export default steps;
