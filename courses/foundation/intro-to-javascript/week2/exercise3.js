function whatToWear (temperature) {if (temperature <0) {return "a heavy coat, gloves and hat";} 
else if (temperature <10) {return "a jacket and warm clothes";} 
else if (temperature <20) {return "a sweater or long sleeves ";}
else if (temperature <20) {return "shorts and a t-shirt";}
else {return "light clothes and stay hydrated";}}

const clothesToWear = whatToWear(18);
console.log(clothesToWear); //sweater as per temperature 
