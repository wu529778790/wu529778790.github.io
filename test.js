Function.prototype.call = function (context, ...args) {
  const context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};
