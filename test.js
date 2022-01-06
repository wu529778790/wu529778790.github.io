const sleep = function (cb, delay) {
  let start = +new Date();
  while (+new Date() - start < delay) {
    continue;
  }
  cb();
};

sleep(() => {
  console.log(1);
}, 2000);
