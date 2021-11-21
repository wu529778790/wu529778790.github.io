function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 反转链表
// const reverseListNode = function(head) {
//   let pre = null;
//   let cur = head;
//   while (cur !== null) {
//     let next = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = next;
//   }
//   return pre;
// };
// console.log(
//     reverseListNode(
//         {
//             val: 1,
//             next: {
//                 val: 2,
//                 next: {
//                     val: 3,
//                     next: {
//                         val: 4,
//                         next: {
//                             val: 5,
//                             next: null,
//                         },
//                     },
//                 },
//             },
//         },
//         2
//     )
// );

// 局部反转链表
// function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }
// const reverseBetween = function(head, m, n) {
//   if (!head || !head.next) {
//     return head;
//   }

//   let pre, cur, leftHead;
//   const dummy = new ListNode();
//   dummy.next = head;
//   let p = dummy;
//   for (let i = 0; i < m - 1; i++) {
//     p = p.next;
//   }
//   leftHead = p;
//   let start = leftHead.next;
//   pre = start;
//   cur = pre.next;
//   for (let i = m; i < n; i++) {
//     let next = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = next;
//   }
//   leftHead.next = pre;
//   start.next = cur;
//   return dummy.next;
// };

// console.log(
//   JSON.stringify(
//     reverseBetween(
//       {
//         val: 1,
//         next: {
//           val: 2,
//           next: {
//             val: 3,
//             next: {
//               val: 4,
//               next: {
//                 val: 5,
//                 next: null,
//               },
//             },
//           },
//         },
//       },
//       2,
//       4
//     )
//   )
// );
// const deleteFromEnd = function(head, n) {
//   if (!head) {
//     return head;
//   }
//   let dummy = new ListNode();
//   dummy.next = head;
//   let fast = dummy;
//   let slow = dummy;

//   while (n !== 0) {
//     fast = fast.next;
//     n--;
//   }
//   while (fast.next !== null) {
//     fast = fast.next;
//     slow = slow.next;
//   }
//   slow.next = slow.next.next;
//   return dummy.next;
// };

// console.log(
//   JSON.stringify(
//     deleteFromEnd(
//       {
//         val: 1,
//         next: {
//           val: 2,
//           next: {
//             val: 3,
//             next: {
//               val: 4,
//               next: {
//                 val: 5,
//                 next: null,
//               },
//             },
//           },
//         },
//       },
//       2
//     )
//   )
// );

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//  var detectCycle = function(head) {
//     // 快慢指针初始化指向 head
//     let slow = head;
//     let fast = head;
//     // 快指针走到末尾时停止
//     while (fast && fast.next) {
//       // 慢指针走一步，快指针走两步
//       slow = slow.next;
//       fast = fast.next.next;
//       // 快慢指针相遇，说明含有环
//       if (slow == fast) {
//         // 任一一节点指向头节点
//         fast = head;
//         // 同步向前进
//         while (fast != slow) {
//           fast = fast.next;
//           slow = slow.next;
//         }
//         // 返回入口节点
//         return fast;
//       }
//     }
//     // 不包含环
//     return null;
//   };

// const leftToRight = {
//   "(": ")",
//   "[": "]",
//   "{": "}",
// };
// const isValid = function(s) {
//   if (!s) {
//     return true;
//   }
//   const stack = [];
//   const len = s.length;
//   for (let i = 0; i < len; i++) {
//     const ch = s[i];
//     if (["(", "{", "["].includes(ch)) {
//       stack.push(leftToRight[ch]);
//     } else {
//       if (!stack.length || stack.pop() !== ch) {
//         return false;
//       }
//     }
//   }
// };

/**
 * @param {string} s
 * @return {boolean}
 */
// var validPalindrome = function(s) {
//   const leftIsRight = function(st, ed) {
//     while (st < ed) {
//       if (s[st] !== s[ed]) {
//         return false;
//       }
//       st++;
//       ed--;
//     }
//     return true;
//   };
//   let left = 0;
//   let right = s.length - 1;
//   while (left < right && s[left] === s[right]) {
//     left++;
//     right--;
//   }

//   if (leftIsRight(left + 1, right)) {
//     return true;
//   }
//   if (leftIsRight(left, right - 1)) {
//     return true;
//   }
//   return false;
// };

// console.log(validPalindrome("abc"));

const mergeTwoListNode = function(l1, l2) {
  let head = new ListNode();
  let cur = head;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }

  cur.next = l1 !== null ? l1 : l2;
  return head.next;
};

const l1 = {
  val: 1,
  next: null,
};
const l2 = {};
console.log(JSON.stringify(mergeTwoListNode(l1, l2)));
