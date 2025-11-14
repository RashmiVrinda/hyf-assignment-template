
const getFullName = (firstName, surname, useFormalName, gender) => {
  if (!firstName?.trim() && !surname?.trim()) {
    return "Name is missing ...";
  }//fixed code

  let fullName = firstName + " " + surname;

  if (useFormalName) {
    if (gender === "female") {
      fullName = "Miss " + fullName;
    } else if (gender === "male") {
      fullName = "Lord " + fullName;
    } else {
      fullName = "Mr " + fullName; 
    }
  }

  return fullName.trim();
};

//call
console.log(getFullName("Benjamin", "Hughes", true, "male"));   // Lord Benjamin Hughes
console.log(getFullName("Benjamin", "Hughes", false, "male"));  // Benjamin Hughes
console.log(getFullName("Rashmi", "Das", true, "female"));      // Miss Rashmi Das
console.log(getFullName("Henrik", "Andersen", true));           // Mr Henrik Andersen
console.log(getFullName("Vrinda", "Sharma", false));            // Vrinda Sharma
