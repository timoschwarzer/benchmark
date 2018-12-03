const amount = 100000

// region Benchmark Tools

/**
 * @param {function(array)} callable
 * The callable is fed with an array containing *amount*
 * random numbers
 * @param {string} message
 * The string to output after the measurement is done.
 * "%time" gets replaces with the time.
 */
const measure = {
  /**
   * @private
   */
  _measures: {},

  sorted(title, callable) {
    const array = []
    for (let i = 0; i < amount; i++) {
      array[i] = Math.random() * 100
    }
    array.sort()
    this._execute(title, array, callable)
  },

  unsorted(title, callable) {
    const array = []
    for (let i = 0; i < amount; i++) {
      array[i] = Math.random() * 100
    }
    this._execute(title, array, callable)
  },

  /**
   * @private
   */
  _execute(title, array, callable) {
    console.log(`${title}: → Started`)
    const timeStart = window.performance.now()
    callable(array, message => console.log(`${title}: ${message}`))
    const timeDelta = window.performance.now() - timeStart
    console.log(`${title}: → Finished`)

    this._measures[title] = timeDelta
  },

  table() {
    console.table(this._measures)
  }
}

// Add skip helpers
measure.unsorted.skip = () => {}
measure.sorted.skip = () => {}

// endregion


measure.unsorted(`Create an array with ${amount} items`, (array, log) => {
  // no op
})

measure.unsorted('Array.sort', (array, log) => {
  array.sort()
})

measure.unsorted('Linear Search', (array, log) => {
  function linearSearch(value) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] === value) {
        return j
      }
    }
    return null
  }

  log(`LinearSearch: Found at #${linearSearch(array[Math.floor(Math.random() * amount)])}.`)
})

measure.unsorted('minSort O(n!)', (array, log) => {
  function minSort(array) {
    let i, j
    let n = array.length

    for (i = 0; i < n; i++) {
      let min = i

      for (j = i + 1; j < n; j++) { //swap 0 for i+1 for optimization
        if (array[j] < array[min]) {
          min = j
        }
      }

      //check if we need to swap
      if (min !== i) {
        //swapping numbers
        let h = array[i]
        array[i] = array[min]
        array[min] = h
      }
    }
  }

  minSort(array)
})

measure.sorted('Binary Search', (array, log) => {
  function binarySearch(value, arr, l, r) {
    if (l === undefined || r === undefined) {
      l = 0
      r = arr.length
    }

    if (l > r) {
      return null
    }

    const mid = Math.floor(l + (r - l) / 2)

    if (arr[mid] === value) {
      return mid
    } else if (arr[mid] > value) {
      return binarySearch(value, arr, l, mid - 1)
    } else {
      return binarySearch(value, arr, mid + 1, r)
    }
  }

  log(`BinarySearch: Found at #${binarySearch(array[Math.floor(Math.random() * amount)], array)}.`)
})

measure.table()