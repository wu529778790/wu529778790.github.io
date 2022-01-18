var arr = [
  { id: 3, parent: 2 },
  { id: 1, parent: null },
  { id: 2, parent: 1 },
];

// const arr2Tree = function (arr) {
//   let temp = {};
//   let root;
//   arr.forEach((item) => {
//     if (item.parent === null) {
//       root = item;
//     }
//     temp[item.id] = item;
//   });
//   arr.map((item) => {
//     if (temp[item.parent]) {
//       temp[item.parent].child = item;
//     }
//   });
//   return root;
// };
// const arr2Tree = function (list) {
//   function findbaba(child) {
//     list.map((item) => {
//       if (item.id === child.parent) {
//         item.child = child;
//       }
//     });
//   }
//   list.map((item) => {
//     if (item.parent) {
//       findbaba(item);
//     }
//   });
//   return list.find((item) => item.parent === null);
// };
// const arr2Tree = function (list) {
//   function findParent(child) {
//     list.map((item) => {
//       if (item.id === child.parent) {
//         item.child = child;
//       }
//     });
//   }
//   list.map((item) => {
//     if (item.parent) {
//       findParent(item);
//     }
//   });
//   return list.find((item) => item.parent === null);
// };
// console.log(arr2Tree(arr));

const bubbleSort = (arr) => {
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    let flag = false;
    for (let j = 0; j < length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (!flag) return arr;
  }
  return arr;
};

const selectSort = (arr) => {
  let length = arr.length;
  let minIndex;
  for (let i = 0; i < length; i++) {
    minIndex = i;
    for (let j = i; j < length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
};
const insertSort = (arr) => {
  if (arr.length <= 1) return arr;
  let length = arr.length;
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
};

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  let middleIndex = Math.floor(arr.length / 2);
  let middleValue = arr.splice(middleIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middleValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(middleValue, quickSort(right));
};
console.log(quickSort([2, 3, 4, 1, 5]));
