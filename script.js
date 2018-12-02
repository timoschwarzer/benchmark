const amount = 100000;
let array = [];

let timeStart = window.performance.now();
for (let i = 0; i < amount; i++) {
  array[i] = Math.random() * 100;
}
let timeDelta = window.performance.now() - timeStart;
console.log('Created ' + amount + ' elements in: ' + timeDelta + 'ms');

function quickFind(value, arr) {
  let pivot = Math.floor(arr.length/2);

  if (pivot === value) {
    return pivot;
  } else if (pivot < value) {
    quickFind(value, arr.splice(pivot)[1]);
  } else {
    quickFind(value, arr.splice(pivot)[0]);
  }
}

timeStart = window.performance.now();
array.sort();
timeDelta = window.performance.now() - timeStart;
console.log('Sort: ' + timeDelta + 'ms');

timeStart = window.performance.now();

function naiveFind(value) {
  for (let j = 0; j < array.length; j++) {
    if (array[j] === value) {
      return j;
    }
  }
  return null;
}
console.log('Found at: ' + naiveFind(array[Math.floor(Math.random() * amount)]));

timeDelta = window.performance.now() - timeStart;
console.log('Find: ' + timeDelta + 'ms');

function minSort(array) {
  let i,j;
  let n = array.length;

  for (i = 0; i < n; i++) {
    let min = i;

    for (j = i+1; j < n; j++) { //swap 0 for i+1 for optimization
      if (array[j] < array[min]) {
        min = j;
      }
    }

    //check if we need to swap
    if (min !== i) {
      //swapping numbers
      let h = array[i];
      array[i] = array[min];
      array[min] = h;
    }
  }
}

for (let i = 0; i < amount; i++) {
  array[i] = Math.random() * 100;
}

timeStart = window.performance.now();
minSort(array);
timeDelta = window.performance.now() - timeStart;
console.log('minSort O(n!): ' + timeDelta + 'ms');

timeStart = window.performance.now();
quickFind(array[Math.floor(Math.random() * amount)], array);
timeDelta = window.performance.now() - timeStart;
console.log('QuickFind: ' + timeDelta + 'ms');
