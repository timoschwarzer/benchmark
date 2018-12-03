# benchmark
Simple js benchmark testing sort algorithms

## API
```js
measure.unsorted('My Benchmark', (array, log) => {
  // Run your code here
})
```

with array being an either sorted or unsorted array (depending on whether you called `measure.sorted` or `measure.unsorted`) and `log` being a simple log function which logs messages to the browser console prefixed with the title.

Append `.skip` to temporarily skip a benchmark. (e.g. `measure.unsorted.skip(...)`)


