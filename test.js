// 为了演示方便，我们在此用fetchImage函数来模拟异步请求图片，返回成功提示
function fetchImage(url) {
  const timeCost = Math.random() * 3000;
  return new Promise((resolve) => setTimeout(resolve, timeCost, "get:" + url));
}

// 待请求的图片
const imageUrls = [
  "pic_1.png",
  "pic_2.png",
  "pic_3.png",
  "pic_4.png",
  "pic_5.png",
  "pic_6.png",
];

/**
 * @description 带并发限制的图片并发请求
 * @param {Array} imageUrls 待请求的图片url列表
 * @param {Object} limit 最大并发个数限制
 * @return { Promise<Array> } resList
 */
function fetchImageWithLimit(imageUrls, limit = 2) {
  let urls = [...imageUrls];
  let rs = new Map();
  function run() {
    if (urls.length > 0) {
      const url = urls.shift();
      console.log(url, " [start at] ", new Date().getTime() % 10000);
      return fetchImage(url).then((res) => {
        console.log(url, " [end at] ", new Date().getTime() % 10000);
        rs.set(url, res);
        return run();
      });
    }
  }
  const promiseList = Array(Math.min(limit, imageUrls.length))
    .fill(Promise.resolve())
    .map((promise) => promise.then(run));
  return Promise.all(promiseList).then(() =>
    imageUrls.map((item) => rs.get(item))
  );
}
fetchImageWithLimit(imageUrls).then((res) => console.log(res));
