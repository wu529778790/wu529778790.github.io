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

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
      // if (promise instanceof Promise) {
      //   promise.then(
      //     (res) => {
      //       resolve(res);
      //     },
      //     (err) => {
      //       rejecte(err);
      //     }
      //   );
      // } else {
      //   resolve(promise);
      // }
    });
  });
};

const shallowClone = function (target) {
  if (typeof target !== "object" || target === null) return target;
  let cloneTarget = Object(target);
  for (let key in target) {
    if (target.hasOwnproperty(key)) {
      cloneTarget[key] = target[key];
    }
  }
  return cloneTarget;
};

const deepClone = function (target, cache = new WeakMap()) {
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  if (target !== "object" || target === null) return target;
  if (cache.has(target)) {
    return cache.get(target);
  }
  let cloneTarget = new target.constructor();
  cache.set(target, true);
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(target[key]);
    }
  }
  let symbolObj = Object.getOwnPropertySymbols(target);
  for (let i = 0; i < symbolObj.length; i++) {
    if (target.hasOwnProperty(symbolObj[i])) {
      cloneTarget[symbolObj[i]] = deepClone(target[symbolObj[i]], cache);
    }
  }
  return cloneTarget;
};

function flatten(arr) {
  return arr.resuce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
