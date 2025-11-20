//When will we be there??

// When will we be there??

function calculateTravelTime(x, y) {
  return x / y;
}

console.log(calculateTravelTime(50, 100));  
const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function getTravelTime(info) {
  const time = info.destinationDistance / info.speed;
   const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
   return `${hours} hours and ${minutes} minutes`;
}

const finalTravelTime = getTravelTime(travelInformation);
console.log(finalTravelTime);  
