Object.assign = function (target, ...args) {
  if (target === null) {
    throw new TypeError("cannot convert undefined or null ro Object");
  }
  let res = Object(target);
  args.forEach((item) => {
    if (item !== null) {
      for (let key of item) {
        if (item.hasOwnProperty(key)) {
          res[key] = item[key];
        }
      }
    }
  });
  return res;
};
