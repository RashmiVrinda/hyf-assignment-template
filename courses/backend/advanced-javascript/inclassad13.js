// Create a function runAfterDelay(delay, callback) 
// that waits delay milliseconds, then calls the callback.


function runAfterDelay(delay, callback) {
  setTimeout(callback, delay);
}
// Test it
runAfterDelay(2000, function () {
  console.log("This runs after 2 seconds");
});
runAfterDelay(1000, function () {
  console.log("This runs after 1 second");
});
console.log("This runs immediately");