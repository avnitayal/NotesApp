import React from 'react';

export default function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div className="notes">
      {notes.map(note => (
        <div className="note" key={note.id}>
          <h3>{note.title}</}</h3>
          <p>{note.content}</p>
          <small>
            Public:{' '}
            <a
              href={`${window.location.origin}/shared/${note.public_id}`}
              target="_blank"
              rel="noreferrer"
            >
              Open
            </a>
          </small>
          <div className="actions">
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
