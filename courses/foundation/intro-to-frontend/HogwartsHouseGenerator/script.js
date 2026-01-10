const nameInput = document.getElementById("nameInput");
const assignBtn = document.getElementById("assignBtn");
const retryBtn = document.getElementById("retryBtn");
const result = document.getElementById("result");
const description = document.getElementById("description");

let hasHouse = false;

const houses = [
  {
    name: "Gryffindor",
    description: "Brave, daring, and courageous.",
    bgColor: "#7f0909",
    textColor: "#ffffff"
  },
  {
    name: "Hufflepuff",
    description: "Loyal, patient, and hardworking.",
    bgColor: "#ecb939",
    textColor: "#000000"
  },
  {
    name: "Ravenclaw",
    description: "Wise, clever, and creative.",
    bgColor: "#0e1a40",
    textColor: "#ffffff"
  },
  {
    name: "Slytherin",
    description: "Ambitious, resourceful, and determined.",
    bgColor: "#1a472a",
    textColor: "#ffffff"
  }
];

function resetUI() {
  hasHouse = false;
  result.textContent = "";
  description.textContent = "";
  document.body.style.backgroundColor = "#f4f4f4";
  document.body.style.color = "#000000";
}

function giveRandomHouse(name) {
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];

  result.textContent = `${name} belongs in ${randomHouse.name}!`;
  description.textContent = randomHouse.description;

  document.body.style.backgroundColor = randomHouse.bgColor;
  document.body.style.color = randomHouse.textColor;
}

function assignHouse() {
  const name = nameInput.value.trim();

  if (!name) return;
  if (hasHouse) return;

  giveRandomHouse(name);
  hasHouse = true;
}

function retryHouse() {
  if (!hasHouse) {
    return;
  }

  const name = nameInput.value.trim();
  giveRandomHouse(name);
}

//NEW: reset when name changes
nameInput.addEventListener("input", resetUI);

assignBtn.addEventListener("click", assignHouse);
retryBtn.addEventListener("click", retryHouse);
