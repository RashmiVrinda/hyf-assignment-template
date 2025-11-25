//Voice assistant


let userName = "";
let todos = [];

function getReply(command) {
  command = command.trim();

 if (command.startsWith("Hello my name is ")) {
  const newName = command.replace("Hello my name is ", "");
  if (userName.toLowerCase() === newName.toLowerCase()) {
    return `You already told me your name is ${userName}!`;
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

  if (command.startsWith("Add ") && command.endsWith(" to my todo")) {
    let item = command.replace("Add ", "").replace(" to my todo", "");
    todos.push(item);
    return item + " added to your todo";
  }
  if (command.startsWith("Remove ") && command.endsWith(" from my todo")) {
    let item = command.replace("Remove ", "").replace(" from my todo", "");
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

  if (command === "What day is it today?" || command === "What day is it today") {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("en-us", { month: "long" });
    const year = today.getFullYear();
    return `${day}. of ${month} ${year}`;
  }


  if (command.startsWith("What is ")) {
    const mathPart = command.replace("What is ", "");
    try {
      const result = eval(mathPart);
      if (!isNaN(result)) {
        return result.toString();
      }
    } catch {}
  }

  if (command.startsWith("Set a timer for ")) {
    const minutes = parseInt(
      command.replace("Set a timer for ", "").replace(" minutes", "")
    );

    setTimeout(() => {
      console.log("Timer done");
    }, minutes * 60 * 1000);

    return `Timer set for ${minutes} minutes`;
  }

  
  if (command === "Tell me a joke") {
    return "Why do programmers hate nature? Too many bugs!";
  }

 
  return "Sorry, I don't understand.";
}


console.log(getReply("Hello my name is Benjamin"));
// Nice to meet you Benjamin

console.log(getReply("What is my name?"));
// Your name is Benjamin

console.log(getReply("Add fishing to my todo"));
// fishing added to your todo

console.log(getReply("Add singing in the shower to my todo"));
// singing in the shower added to your todo

console.log(getReply("What is on my todo?"));
// You have 2 todos: fishing and singing in the shower

console.log(getReply("Remove fishing from my todo"));
// Removed fishing from your todo

console.log(getReply("What is 4 * 12"));
// 48

console.log(getReply("Set a timer for 1 minutes"));
// Timer set for 1 minutes (then after 1 minute: Timer done)

