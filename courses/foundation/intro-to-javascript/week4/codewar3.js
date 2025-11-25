//code war 3

function highAndLow(str) {
  let numbers = str.split(" ").map(Number);  // convert to array of numbers
  
  let highest = numbers[0];
  let lowest = numbers[0];

  for (let num of numbers) {
    if (num > highest) {
      highest = num;
    }
    if (num < lowest) {
      lowest = num;
    }
  }

  return highest + " " + lowest;
}

console.log(highAndLow("1 2 3 4 5"));       // 5 1
console.log(highAndLow("1 2 -3 4 5"));      // 5 -3
console.log(highAndLow("1 9 3 4 -5"));      // 9 -5
