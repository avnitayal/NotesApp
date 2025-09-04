import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    });
    setNewNote("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const updateNote = async (id) => {
    if (!newNote.trim()) return;
    await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    });
    setNewNote("");
    setEditingNote(null);
    fetchNotes();
  };

  const shareNote = (id) => {
    const shareUrl = `${API_URL}/share/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Share link copied: " + shareUrl);
  };

  return (
    <div className="container">
      <h1 className="title">📝 Notes App</h1>

      <div className="inputBox">
        <input
          type="text"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="input"
        />
        <button
          onClick={() =>
            editingNote ? updateNote(editingNote) : addNote()
          }
          className="addButton"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="notesList">
        {notes.map((note) => (
          <div key={note.id} className="noteCard">
            <p className="noteText">{note.content}</p>
            <div className="actions">
              <button
                onClick={() => {
                  setEditingNote(note.id);
                  setNewNote(note.content);
                }}
                className="editButton"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="deleteButton"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => shareNote(note.id)}
                className="shareButton"
              >
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
