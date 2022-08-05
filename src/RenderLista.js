import React, { useEffect, useState } from "react";
import Note from "./Note";
import { getAllNotes, createNote } from "./services/notes/index";
const RenderLista = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getAllNotes().then((res) => setNotes(res));
  }, []);

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      userId: 1,
      title: newNote,
      body: newNote,
    };

    createNote(obj)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      })
      .catch((e) => console.error(e));
    setNewNote("");
  };

  return (
    <>
      <h2>RenderLista</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Agregar nota</button>
      </form>
      <ol>
        {notes.map((note) => (
          <Note title={note.title} key={note.id} />
        ))}
      </ol>
    </>
  );
};

export default RenderLista;
