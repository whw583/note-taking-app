export interface Note {
  id:string
  updated:string,
  title:string,
  body:string
}

export interface ToSaveNote {
  id?:string
  title:string,
  body:string
}



export const  getAllNotes=():Note[]=> {
  const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

  return notes.sort((a:Note, b:Note) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
}

export const  saveNote=(noteToSave:ToSaveNote):string=> {
  const notes = getAllNotes();
  const existing = notes.find((note) => note.id === noteToSave.id);


  const id =  existing?.id || noteToSave.id || (Math.floor(Math.random() * 1000000)+"")


  // Edit/Update
  if (existing) {
    existing.title = noteToSave.title;
    existing.body = noteToSave.body;
    existing.updated = new Date().toISOString();
  } else {
    notes.push({
      ...noteToSave,
      id:id,
      updated : new Date().toISOString()
    });
  }

  localStorage.setItem("notesapp-notes", JSON.stringify(notes));

  return id
}

export const  deleteNote=(id:string)=> {
  const notes = getAllNotes();
  const newNotes = notes.filter((note:Note) => note.id != id);

  localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
}
