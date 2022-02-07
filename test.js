function limitRequest(limit, requestes) {
  let runCount = 0;
  const request = () => {
    if (!requestes || !requestes.length || runCount >= limit) {
      return;
    }
    runCount++;
    requestes
      .shift()()
      .then(() => {
        runCount--;
        request();
      });
  };
  for (let i = 0; i < limit; i++) {
    request();
  }
}
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
const requestes = [
  () => timeout(1000).then(() => console.log(11)),
  () => timeout(500).then(() => console.log(22)),
  () => timeout(300).then(() => console.log(33)),
  () => timeout(400).then(() => console.log(44)),
];
limitRequest(2, requestes);
