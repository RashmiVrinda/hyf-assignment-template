// Exercise 5: Build runSequentially ⭐⭐
// Create a utility function that runs delayed operations in sequence:

function runSequentially(tasks, finalCallback) {
  let index = 0;
  const runNext = () =>
    tasks[index]
      ? tasks[index++](() => runNext()) // 👈 यहाँ recursion
      : finalCallback();
  runNext();
}

const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
