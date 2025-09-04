import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedNote } from '../api';

export default function ShareView() {
  const { publicId } = useParams();
  const [note, setNote] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try { const res = await getSharedNote(publicId); setNote(res.data); }
      catch { setErr('Note not found'); }
    })();
  }, [publicId]);

  if (err) return <div className="container"><h2>{err}</h2></div>;
  if (!note) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
