//NOnoN0nOYes (Note taking app)

const notes = [];

function saveNote(content, id) {
  // write some code here

 let newNote = {content,id };
notes.push(newNote);
  
}

function getNote(id) {

  if (!id || typeof id !== "number") {
  return "Error: id must be a number!";
  }
  for (let i = 0; i < notes.length; i++) {
 if (notes[i].id === id) {
return notes[i];
    }
  }
  return "Note not found!";

}

function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
  console.log( `The note with id: ${notes[i].id},, has the following note text: ${notes[i].content}`);
  }
}
  // Unique feature delete a note: 
function deleteNote(id) {
  
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1); 
return `Note with id ${id} was deleted.`;
    }
  }

  return "Note not found!";
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
logOutNotesFormatted();
const firstNote = getNote(1);
console.log(firstNote); // {content: 'Pick up groceries', id: 1}

console.log(notes); // [{content: 'Pick up groceries', id: 1}, {content: 'Do laundry', id: 2}]node lesson2.jssaveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);


console.log(notes); // [{content: 'Pick up groceries', id: 1}, {content: 'Do laundry', id: 2}]

console.log(deleteNote(2));
console.log(notes);


