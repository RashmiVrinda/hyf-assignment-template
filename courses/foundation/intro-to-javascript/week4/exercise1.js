//Voice assistant


let userName = "";
let todos = [];

function nameLogic(command) {

 if (command.startsWith("Hello my name is ")) {
  const newName = command.replace("Hello my name is ", "").trim();//trim to newName extraction
  if (userName.toLowerCase() === newName.toLowerCase()) {
    return `You already told me your name is ${userName}!`;
    }
//Add specific error for empty name    
if (newName.length === 0) {
            return "Please tell me your name after 'Hello my name is'.";
        }
    userName = newName;
    return "Nice to meet you " + userName;
  }
if (command === "What is my name?" || command === "What is my name") {
   if (userName === "") {
    return "I don't know your name yet.";
    }
    return "Your name is " + userName;
  }
}
function todoLogic(command){
  if (command.startsWith("Add ") && command.endsWith(" to my todo")) {
    const item = command.replace("Add ", "").replace(" to my todo", "").trim();
    todos.push(item);
    return item + " added to your todo";
  }
  if (command.startsWith("Remove ") && command.endsWith(" from my todo")) {
    const item = command.replace("Remove ", "").replace(" from my todo", "");
    const index = todos.indexOf(item);

    if (index === -1) {
      return item + " is not in your todo";
    }

    todos.splice(index, 1);
    return "Removed " + item + " from your todo";
  }

  if (command === "What is on my todo?" || command === "What is on my todo") {
    if (todos.length === 0) {
      return "Your todo list is empty.";
    }
    return `You have ${todos.length} todos: ${todos.join(" and ")}`;
  }
}
  function dateLogic(command){
    if (command === "What day is it today?" || command === "What day is it today") {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("en-us", { month: "long" });
    const year = today.getFullYear();
    return `${day}. of ${month} ${year}`;
  }
  }
function mathLogic(command){
  if (command.startsWith("What is ")) {
    const mathPart = command.replace("What is ", "").trim();
    // Remove the "What is " prefix to isolate the math part (e.g., "10 + 5")
    const parts = mathPart.split(" ");
    
    if (parts.length !== 3) //2. Validate the format (must have exactly 3 parts)
    {
      return "I can only calculate simple expressions like 4 * 12";
    }

    const stringOperand1 = parts[0];// Kept as string
    const operator = parts[1];
    const stringOperand2 = parts[2];

//Convert the string operands into actual numbers
   
    const number1 = Number(stringOperand1);
        const number2 = Number(stringOperand2);

   //Validate that both parts are indeed numbers 
        if (isNaN(number1) || isNaN(number2)) {
      return "Please use valid numbers for the calculation.";
    }

    let result = null;
    if (operator === "+") {
            result = number1 + number2;
        } else if (operator === "-") {
            result = number1 - number2;
        } else if (operator === "*") {
            result = number1 * number2;
        } else if (operator === "/") {
          if (number2 === 0) {
                return "Cannot divide by zero.";
            }
            result = number1 / number2;
        } else {
          return "Unknown operator. I can only use +, -, * or /.";
        }
        return result.toString();
    }
  }
function timerLogic(command){
  if (command.startsWith("Set a timer for ")) {
    const minutes = parseInt(
      command.replace("Set a timer for ", "").replace(" minutes", "")
    );

    setTimeout(() => {
      console.log("Timer done");
    }, minutes * 60 * 1000);

    return `Timer set for ${minutes} minutes`;
  }
}
  function jokeLogic(command){
  if (command === "Tell me a joke") {
    return "Why do programmers hate nature? Too many bugs!";
  }

 
  return "Sorry, I don't understand.";

}

//MAIN ROUTER FUNCTION (getReply)

function getReply(command) {
  command = command.trim();

  //  ROUTING: NAME 
  if (command.startsWith("Hello my name is ") || 
      command === "What is my name?" || 
      command === "What is my name") {
      return nameLogic(command);
  } 

  //ROUTING: TODO LIST 
  if (command.includes("todo")) {
      return todoLogic(command);
  }
  
  // ROUTING: DATE 
  if (command === "What day is it today?" || command === "What day is it today") {
      return dateLogic(command);
  }
  
  // ROUTING: MATH 
  if (command.startsWith("What is ")) {
      return mathLogic(command);
  }
  
  // ROUTING: TIMER 
  if (command.startsWith("Set a timer for ")) {
      return timerLogic(command);
  }

  // ROUTING: JOKE 
  if (command === "Tell me a joke") {
      return jokeLogic(command);
  }
  
  // CATCH-ALL (DEFAULT RESPONSE)
  return "I'm sorry, I don't recognize that command structure. I can help with names, todos, math, the date, jokes, or timers.";
}


console.log("1. NAME COMMANDS");
console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Hello my name is Benjamin")); // Error Test: Name already set

console.log("2. TODO COMMANDS");
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("Remove driving from my todo")); // Error Test: Item not found

console.log("3. MATH COMMANDS");
console.log(getReply("What is 122 * 12"));
console.log(getReply("What is 100 / 0")); // Error Test: Divide by zero
console.log(getReply("What is 5 +"));     // Error Test: Wrong format

console.log("4. OTHER COMMANDS");
// Note: Date will show today's date (November 28, 2025)
console.log(getReply("What day is it today?")); 
console.log(getReply("Tell me a joke"));
console.log(getReply("Set a timer for 1 minutes"));

console.log("5. CATCH-ALL ERROR");
console.log(getReply("I need some coffee"));
