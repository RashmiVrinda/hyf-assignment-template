
// 1. Human Age in the Future

const yearOfBirth = 1987;
const yearFuture = 2027;
const age = yearFuture - yearOfBirth;
console.log("You will be " + age + " years old in " + yearFuture + ".");


// 2. Dog Age Calculator

const dogYearOfBirth = 2017;
const dogYearFuture = 2027;
const dogYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true; // Boolean

if (shouldShowResultInDogYears) {
  console.log("Your dog will be " + (dogYear * 7) + " dog years old in " + dogYearFuture + ".");
} else {
  console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture + ".");
}

// 🏠 3. House Price Calculator

// Peter's house
const widthPeter = 8;
const depthPeter = 10;
const heightPeter = 10;
const gardenPeter = 100;
const actualPricePeter = 2500000;

const volumePeter = widthPeter * depthPeter * heightPeter;
const housePricePeter = volumePeter * 2.5 * 1000 + gardenPeter * 300;

if (housePricePeter < actualPricePeter) {
  console.log("Peter is paying too much. His calculated price is " + housePricePeter + ".");
} else {
  console.log("Peter is paying too little. His calculated price is " + housePricePeter + ".");
}

// Julia's house
const widthJulia = 5;
const depthJulia = 11;
const heightJulia = 8;
const gardenJulia = 70;
const actualPriceJulia = 1000000;

const volumeJulia = widthJulia * depthJulia * heightJulia;
const housePriceJulia = volumeJulia * 2.5 * 1000 + gardenJulia * 300;

if (housePriceJulia < actualPriceJulia) {
  console.log("Julia is paying too much. Her calculated price is " + housePriceJulia + ".");
} else {
  console.log("Julia is paying too little. Her calculated price is " + housePriceJulia + ".");
}

// 🚀 4. Ez Namey (Startup Name Generator)


const firstWords = ["Easy", "Awesome", "Tech", "Smart", "Next", "Quick", "Blue", "Creative", "Bright", "Happy"];
const secondWords = ["Solutions", "Systems", "Corporation", "Designs", "Hub", "Works", "Concepts", "Labs", "Group", "Innovations"];

const randomNumber = Math.floor(Math.random() * 10);
const startupName = firstWords[randomNumber] + " " + secondWords[randomNumber];
const nameLength = startupName.length;

console.log("The startup: \"" + startupName + "\" contains " + nameLength + " characters.");
