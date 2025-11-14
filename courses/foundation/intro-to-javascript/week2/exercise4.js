const class07Students = [];
function addStudentToClass(studentName) { studentName = studentName.trim();
  if (studentName === "") {
  console.log("You cannot add an empty name to the class");
  return;
}//fixed code 
 
if (class07Students.includes(studentName)) {
  console.log(`Student ${studentName} is already in the class`);
  return;
}
if (studentName === "Queen") {
  class07Students.push(studentName);
  return;
}
if (class07Students.length >= 6) {
  console.log("Cannot add more students to class 07");
  return;
}
class07Students.push(studentName);
}
addStudentToClass("Emil");
addStudentToClass("Theo");
addStudentToClass("Kaya");
addStudentToClass("Subina");
addStudentToClass("Vrinda");
addStudentToClass("Noah");
addStudentToClass("Prayesh"); // Should print "Cannot add more students to class 07"
addStudentToClass("Theo");    // Should print "Student Theo is already in the class"
addStudentToClass("Queen");   // Queen always gets added
addStudentToClass("  ");        // Should print "You cannot add an empty name to the class"

console.log("Final class list:", class07Students);