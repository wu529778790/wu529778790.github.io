class myPromise {
  constructor(exector) {
    this.initValue();
    this.initBind();
    try {
      exector(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  initValue() {
    this.PromiseStatus = "pending";
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    if (this.PromiseStatus !== "pending") return;
    this.PromiseStatus = "fulfilled";
    this.PromiseResult = value;
    if (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }

  reject(reason) {
    if (this.Promistatus !== "pending") return;
    this.PromiseStatus = "rejected";
    this.PromiseResult = reason;
    if (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw new Error(reason);
          };
    let thenPromise = new Promise((resolve, reject) => {
      const resolvePromise = (cb) => {
        queueMicrotask(() => {
          try {
            const x = cb(this.PromiseResult);
            if (x === undefined) {
              throw new Error("不能返回自身");
            }
            if (x instanceof myPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (error) {
            reject(error);
          }
        });
      };
      if (this.PromiseStatus === "fulfilled") {
        resolvePromise(onFulfilled);
      } else if (this.PromiseStatus === "rejected") {
        resolvePromise(onRejected);
      } else if (this.PromiseStatus === "pending") {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
      }
    });
    return thenPromise;
  }

  finally(cb) {
    return this.then(
      (res) => Promise.resolve(cb()).then(() => res),
      (err) =>
        Promise.reject(cb()).then(() => {
          throw Error(err);
        })
    );
  }
}

Promise.all = function (promises) {
  if (!Array.isArray(promises))
    throw new TypeError("arguments must be a array");
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0
    let addData = (value, index) => {
      result[index] = value;
      if (result.length === promises.length) {
        resolve(result);
      }
    };
    promises.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(
          (res) => {
            addData(res, index);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        addData(primise, index);
      }
    });
  });
};
