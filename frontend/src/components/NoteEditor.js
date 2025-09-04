import React, { useState, useEffect } from 'react';

export default function NoteEditor({ onCreate, note, onUpdate, onCancel }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  async function submit(e) {
    e.preventDefault();
    if (note) {
      await onUpdate(note.id, { title, content });
    } else {
      await onCreate({ title, content });
      setTitle('');
      setContent('');
    }
  }

  return (
    <form className="editor" onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <div className="editor-actions">
        <button type="submit">{note ? 'Update' : 'Create'}</button>
        {note && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
