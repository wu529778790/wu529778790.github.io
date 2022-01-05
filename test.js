// // function ListNode(val) {
// //   this.val = val;
// //   this.next = null;
// // }
// // // 反转链表
// // // const reverseListNode = function(head) {
// // //   let pre = null;
// // //   let cur = head;
// // //   while (cur !== null) {
// // //     let next = cur.next;
// // //     cur.next = pre;
// // //     pre = cur;
// // //     cur = next;
// // //   }
// // //   return pre;
// // // };
// // // console.log(
// // //     reverseListNode(
// // //         {
// // //             val: 1,
// // //             next: {
// // //                 val: 2,
// // //                 next: {
// // //                     val: 3,
// // //                     next: {
// // //                         val: 4,
// // //                         next: {
// // //                             val: 5,
// // //                             next: null,
// // //                         },
// // //                     },
// // //                 },
// // //             },
// // //         },
// // //         2
// // //     )
// // // );

const { right } = require("inquirer/lib/utils/readline");

// // // 局部反转链表
// // // function ListNode(val) {
// // //   this.val = val;
// // //   this.next = null;
// // // }
// // // const reverseBetween = function(head, m, n) {
// // //   if (!head || !head.next) {
// // //     return head;
// // //   }

// // //   let pre, cur, leftHead;
// // //   const dummy = new ListNode();
// // //   dummy.next = head;
// // //   let p = dummy;
// // //   for (let i = 0; i < m - 1; i++) {
// // //     p = p.next;
// // //   }
// // //   leftHead = p;
// // //   let start = leftHead.next;
// // //   pre = start;
// // //   cur = pre.next;
// // //   for (let i = m; i < n; i++) {
// // //     let next = cur.next;
// // //     cur.next = pre;
// // //     pre = cur;
// // //     cur = next;
// // //   }
// // //   leftHead.next = pre;
// // //   start.next = cur;
// // //   return dummy.next;
// // // };

// // // console.log(
// // //   JSON.stringify(
// // //     reverseBetween(
// // //       {
// // //         val: 1,
// // //         next: {
// // //           val: 2,
// // //           next: {
// // //             val: 3,
// // //             next: {
// // //               val: 4,
// // //               next: {
// // //                 val: 5,
// // //                 next: null,
// // //               },
// // //             },
// // //           },
// // //         },
// // //       },
// // //       2,
// // //       4
// // //     )
// // //   )
// // // );
// // // const deleteFromEnd = function(head, n) {
// // //   if (!head) {
// // //     return head;
// // //   }
// // //   let dummy = new ListNode();
// // //   dummy.next = head;
// // //   let fast = dummy;
// // //   let slow = dummy;

// // //   while (n !== 0) {
// // //     fast = fast.next;
// // //     n--;
// // //   }
// // //   while (fast.next !== null) {
// // //     fast = fast.next;
// // //     slow = slow.next;
// // //   }
// // //   slow.next = slow.next.next;
// // //   return dummy.next;
// // // };

// // // console.log(
// // //   JSON.stringify(
// // //     deleteFromEnd(
// // //       {
// // //         val: 1,
// // //         next: {
// // //           val: 2,
// // //           next: {
// // //             val: 3,
// // //             next: {
// // //               val: 4,
// // //               next: {
// // //                 val: 5,
// // //                 next: null,
// // //               },
// // //             },
// // //           },
// // //         },
// // //       },
// // //       2
// // //     )
// // //   )
// // // );

// // /**
// //  * @param {ListNode} head
// //  * @return {ListNode}
// //  */
// // //  var detectCycle = function(head) {
// // //     // 快慢指针初始化指向 head
// // //     let slow = head;
// // //     let fast = head;
// // //     // 快指针走到末尾时停止
// // //     while (fast && fast.next) {
// // //       // 慢指针走一步，快指针走两步
// // //       slow = slow.next;
// // //       fast = fast.next.next;
// // //       // 快慢指针相遇，说明含有环
// // //       if (slow == fast) {
// // //         // 任一一节点指向头节点
// // //         fast = head;
// // //         // 同步向前进
// // //         while (fast != slow) {
// // //           fast = fast.next;
// // //           slow = slow.next;
// // //         }
// // //         // 返回入口节点
// // //         return fast;
// // //       }
// // //     }
// // //     // 不包含环
// // //     return null;
// // //   };

// // // const leftToRight = {
// // //   "(": ")",
// // //   "[": "]",
// // //   "{": "}",
// // // };
// // // const isValid = function(s) {
// // //   if (!s) {
// // //     return true;
// // //   }
// // //   const stack = [];
// // //   const len = s.length;
// // //   for (let i = 0; i < len; i++) {
// // //     const ch = s[i];
// // //     if (["(", "{", "["].includes(ch)) {
// // //       stack.push(leftToRight[ch]);
// // //     } else {
// // //       if (!stack.length || stack.pop() !== ch) {
// // //         return false;
// // //       }
// // //     }
// // //   }
// // // };

// // /**
// //  * @param {string} s
// //  * @return {boolean}
// //  */
// // // var validPalindrome = function(s) {
// // //   const leftIsRight = function(st, ed) {
// // //     while (st < ed) {
// // //       if (s[st] !== s[ed]) {
// // //         return false;
// // //       }
// // //       st++;
// // //       ed--;
// // //     }
// // //     return true;
// // //   };
// // //   let left = 0;
// // //   let right = s.length - 1;
// // //   while (left < right && s[left] === s[right]) {
// // //     left++;
// // //     right--;
// // //   }

// // //   if (leftIsRight(left + 1, right)) {
// // //     return true;
// // //   }
// // //   if (leftIsRight(left, right - 1)) {
// // //     return true;
// // //   }
// // //   return false;
// // // };

// // // console.log(validPalindrome("abc"));

// // // const mergeTwoListNode = function(l1, l2) {
// // //   let head = new ListNode();
// // //   let cur = head;
// // //   while (l1 && l2) {
// // //     if (l1.val <= l2.val) {
// // //       cur.next = l1;
// // //       l1 = l1.next;
// // //     } else {
// // //       cur.next = l2;
// // //       l2 = l2.next;
// // //     }
// // //     cur = cur.next;
// // //   }

// // //   cur.next = l1 !== null ? l1 : l2;
// // //   return head.next;
// // // };

// // // const l1 = {
// // //   val: 1,
// // //   next: null,
// // // };
// // // const l2 = {};
// // // console.log(JSON.stringify(mergeTwoListNode(l1, l2)));

// // // 冒泡排序
// // function bubbleSort(arr) {
// //   const len = arr.length;
// //   for (let i = 0; i < len; i++) {
// //     console.log(i);
// //     let flag = false;
// //     for (let j = 0; j < len - 1 - i; j++) {
// //       if (arr[j] > arr[j + 1]) {
// //         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
// //         flag = true;
// //       }
// //     }
// //     // 若一次交换也没发生，说明数组有序，直接返回
// //     if (flag === false) return arr;
// //   }
// //   return arr;
// // }
// // // console.log(bubbleSort([5, 4, 3, 2, 1]));
// // // 选择排序

// // function selectSort(arr) {
// //   const len = arr.length;
// //   let minIndex;
// //   for (let i = 0; i < len - 1; i++) {
// //     minIndex = i;
// //     for (let j = i; j < len; j++) {
// //       if (arr[j] < arr[minIndex]) {
// //         minIndex = j;
// //       }
// //     }
// //     if (minIndex !== i) {
// //       [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
// //     }
// //   }
// //   return arr;
// // }
// // console.log(selectSort([5, 4, 3, 2, 1]));

// // // 插入排序

// // function insertSort(arr) {
// //   const len = arr.length;
// //   let temp;
// //   for (let i = 1; i < len; i++) {
// //     temp = arr[i];
// //     let j = i;
// //     while (j > 0 && arr[j - 1] > temp) {
// //       arr[j] = arr[j - 1];
// //       j--;
// //     }
// //     arr[j] = temp;
// //   }
// //   return arr;
// // }
// // // console.log(insertSort([5, 4, 3, 2, 1]));

// // 用法如下:
// function fn1(x) {
//   return x + 1;
// }
// function fn2(x) {
//   return x + 2;
// }
// function fn3(x) {
//   return x + 3;
// }
// function fn4(x) {
//   return x + 4;
// }
// // 就是把函数按顺序执行

// function compose(...fn) {
//   if (!fn.length) return (v) => v;
//   if (fn.length === 1) return fn[0];
//   return fn.reduce((pre, cur) => {
//     return (...args) => {
//       const tem = cur(...args)
//       return pre(tem);
//     };
//   });
// }
// const a = compose(fn1, fn2, fn3, fn4);
// console.log(a(1)); // 1+4+3+2+1=11

// function mySetinterVal(cb, delay) {
//   setTimeout(() => {
//     cb();
//     mySetinterVal(cb, delay);
//   }, delay);
// }
// mySetinterVal(() => {
//   console.log(1);
// }, 1000);

// function mySetTimeout(cb, delay) {
//   const timer = setInterval(() => {
//     cb();
//     clearInterval(timer);
//   }, delay);
// }

// mySetTimeout(() => {
//   console.log(1);
// }, 1000);

// String.prototype.strim1 = function () {
//   return this.replace(/(^\s+|\s+$)/g, "");
// };
// String.prototype.strim2 = function () {
//   return this.replace(/^\s+(.*?)\s+$/g, "$1");
// };

// let str = "     dsfd    ";

// console.log(str, 1);
// console.log(str.trim(), 2);
// console.log(str.strim1(), 3);
// console.log(str.strim2(), 4);

// console.log('13785241526'.replace(/(?=(\d{4})+$)/g,'-'))
// const splitMobile = (mobile, format = "-") => {
//   return String(mobile).replace(/(?=(\d{4})+$)/g, format);
// };
// console.log(splitMobile(13785241526))

// const formatPrice = function (num) {
//   console.log(num);
//   const [integer, decimal = ""] = String(num).split(".");
//   console.log(integer, decimal);
//   return (
//     integer.replace(/\B(?=(\d{3})+$)/g, ",") + (decimal ? "." + decimal : "")
//   );
// };

// console.log(formatPrice(123456789.3343));

// const render = (template, data) => {
//   return template.replace(/{{\s*?(\w+)\s*?}}/g, (match, key) => {
//     return key && data.hasOwnProperty(key) ? data[key] : "";
//   });
// };

// const data = {
//   name: "神族九帝",
//   age: 100,
// };
// const template = `
//   我是: {{ name }}
//   年龄是: {{age}}
// `;
// console.log(render(template, data));

// const sleep = (func, delay) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(func());
//     }, delay);
//   });
// };

// const consoleStr = (str) => {
//   return () => {
//     console.log(str);
//     return str;
//   };
// };

// const doFns = async () => {
//   const name = await sleep(consoleStr("神族九帝"), 1000);
//   const sex = await sleep(consoleStr("boy"), 1000);
//   const age = await sleep(consoleStr(100), 1000);
//   console.log(name, sex, age);
// };

// doFns();

// const quickSort = (arr) => {
//   if (arr.length <= 1) return arr;
//   let middleIndex = Math.floor(arr.length / 2);
//   // let middleValue = arr[middleIndex]; // 这样写会报内存溢出
//   let middleValue = arr.splice(middleIndex, 1)[0];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < middleValue) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return quickSort(left).concat([middleValue], quickSort(right));
// };
// console.log(quickSort([4, 5, 2, 8, 1]));

/**
 * @param {number[]} nums
 * @return {number}
 */
// var removeDuplicates = function (nums) {
//   if ([0, 1].includes(nums.length)) {
//     return nums.length;
//   }
//   let slow = 0;
//   let fast = 1;
//   const length = nums.length;
//   while (fast < length) {
//     if (nums[slow] !== nums[fast]) {
//       // 走到不相等的时候，slow走一步，是为了保留一个相同的值，剩下的重新赋值
//       nums[++slow] = nums[fast];
//     }
//     // 如果相等，fast一直走
//     fast++;
//   }
//   return slow + 1;
// };
// nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// console.log(removeDuplicates(nums), nums);

Object.assign = function (target, ...source) {
  if (target === null) {
    throw new TypeError("cannot concert undefined or null to Object");
  }

  let res = Object(target);
  source.forEach((item) => {
    if (item !== null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(ket)) {
          res[key] = obj[key];
        }
      }
    }
  });
  return res;
};

var restoreIpAddresses = function(s) {
  const SEG_COUNT = 4;
  const segments = new Array(SEG_COUNT);
  const ans = [];

  const dfs = (s, segId, segStart) => {
      // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
      if (segId === SEG_COUNT) {
          if (segStart === s.length) {
              ans.push(segments.join('.'));
          }
          return;
      }

      // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
      if (segStart === s.length) {
          return;
      }

      // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
      if (s.charAt(segStart) === '0') {
          segments[segId] = 0;
          dfs(s, segId + 1, segStart + 1);
      }

      // 一般情况，枚举每一种可能性并递归
      let addr = 0;
      for (let segEnd = segStart; segEnd < s.length; ++segEnd) {
          addr = addr * 10 + (s.charAt(segEnd) - '0');
          if (addr > 0 && addr <= 0xFF) {
              segments[segId] = addr;
              dfs(s, segId + 1, segEnd + 1);
          } else {
              break;
          }
      }
  }

  dfs(s, 0, 0);
  return ans;
};