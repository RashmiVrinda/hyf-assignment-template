function functionRunner(fn) {
  functionRunner()// call the function that was passed in
}
functionRunner(function () {
  console.log("I was called!");
});

const sayHello = function () {
  console.log("Hello!");
};
functionRunner(sayHello);