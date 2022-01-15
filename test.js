Function.prototype.call = function (context, ...args) {
  const context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};

Function.prototype.bind = function (context, ...args) {
  if (typeof context !== "function")
    throw TypeError("context must be a function");
  let that = this;
  let rfn = function () {
    that.call(context, ...args, arguments);
  };
  if (this.prototype) {
    rfn.rptototype = Object.create(this.prototype);
  }
  return rfn;
};
