// 待请求的图片
const imageUrls = [
  "pic_1.png",
  "pic_2.png",
  "pic_3.png",
  "pic_4.png",
  "pic_5.png",
  "pic_6.png",
];
// 模拟请求
const request = (url) => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 3000, url);
    // setTimeout(resolve, 1000, url);
  });
};
const requestes = [];
imageUrls.map((item) => {
  requestes.push(request(item));
});

const promiseWithLimit = (limit = 2, requestes) => {
  const queue = [...requestes]
  // let pool = []; //并发池

  // 添加任务
  function addTask(task) {
    // pool.push(task);
    task.then((res) => {
      //请求结束后将该Promise任务从并发池中移除
      // pool.splice(pool.indexOf(task), 1);
      console.log(`${res}，当前并发数：${pool.length}`);
      addTask(queue.shift())
    });
  }

  //每当并发池跑完一个任务，就再塞入一个任务
  // function run(race) {
  //   race.then(() => {
  //     let task = requestes.shift();
  //     if (task !== undefined) {
  //       addTask(task);
  //       run(Promise.race(pool));
  //     }
  //   });
  // }
  //先循环把并发池塞满
  while (queue.length <= limit) {
    console.log(queue)
    addTask(queue.shift());
  }
  //利用Promise.race方法来获得并发池中某任务完成的信号
  // let race = Promise.race(pool);
  // run(race);
};

promiseWithLimit(2, requestes);
