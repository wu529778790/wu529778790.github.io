function sum(...args) {
  let allArgs = [...args];
  const rfn = (...args2) => {
    allArgs = [...allArgs, ...args2];
    return rfn;
  };
  rfn.valueOf = () => {
    return allArgs.reduce((pre, cur) => {
      return pre + cur;
    });
  };

  return rfn;
}

console.log(sum(1, 2, 3).valueOf());
console.log(sum(2, 3)(2).valueOf());
console.log(sum(1)(2)(3)(4).valueOf());
console.log(sum(2)(4, 1)(2).valueOf());
