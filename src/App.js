import React, { useState, useEffect } from "react";
// import notas from "./notes";
import Note from "./components/Note";
import { getAllNotes, createNote } from "./services/notes/index";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    getAllNotes().then((res) => setNotes(res));
  }, []);

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id: 2,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    createNote(obj)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      })
      .catch((e) => console.error(e));
    setNewNote("");
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h3>Agregar una nota </h3>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "true"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note content={note.content} key={note.id} />
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />

        <button>agregar Nota</button>
      </form>

      <p></p>
    </div>
  );
};

export default App;
