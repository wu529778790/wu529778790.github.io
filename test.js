console.log(4);
const promise = new Promise((resolve) => {
  console.log(2);
  resolve();
  console.log(6);
});

async function foo() {
  console.log(1);
  await promise;
  console.log(3);
}

foo();
promise.then(() => {
  console.log(5);
});
setTimeout(() => console.log(8));
console.log(7);
