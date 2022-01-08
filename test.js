class Notifier {
  //通知者
  constructor() {
    this.observer = []; //观察者列表
  }
  add(obj) {
    this.observer.push(obj); //添加观察者
  }
  remove(obj) {
    let index = this.observer.findIndex((o) => {
      return o === obj;
    }); //找到 删除对象的索引
    if (index >= 0) {
      this.observer.splice(index, 1);
    }
  }
  notify() {
    //通知每个观察者
    this.observer.forEach((obj) => {
      obj.update();
    });
  }
}

class Observer {
  //观察者
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(this.name, "收到通知");
  }
}

let notifier = new Notifier();
let observer1 = new Observer("张三");
let observer2 = new Observer("李四");
notifier.add(observer1);
notifier.add(observer2);

notifier.remove(observer1); //测试删除
notifier.notify();
