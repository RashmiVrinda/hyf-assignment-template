//Consider an array/list of sheep where some sheep may be missing from their place.
//  We need a function that counts the number of sheep present in the array (true means present).


function countSheeps(sheep) {
let count = 0;
  for (let i=0; i <sheep.length; i++){
  if (sheep[i] === true)  {
    count ++
  }
  } 
return count;}
console.log(countSheeps([true, true, false, true]));
console.log(countSheeps([true, null, false, undefined, true]));// expected: 2

