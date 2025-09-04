from typing import List, Optional
from sqlmodel import Session, select
from .models import Note, NoteCreate, NoteUpdate

def create_note(session: Session, data: NoteCreate) -> Note:
    note = Note(title=data.title, content=data.content)
    session.add(note)
    session.commit()
    session.refresh(note)
    return note

def list_notes(session: Session) -> List[Note]:
    return session.exec(select(Note).order_by(Note.id.desc())).all()

def get_note(session: Session, note_id: int) -> Optional[Note]:
    return session.get(Note, note_id)

def update_note(session: Session, note_id: int, data: NoteUpdate) -> Optional[Note]:
    note = session.get(Note, note_id)
    if not note:
        return None
    for k, v in data.dict(exclude_unset=True).items():
        setattr(note, k, v)
    session.add(note)
    session.commit()
    session.refresh(note)
    return note

def delete_note(session: Session, note_id: int) -> bool:
    note = session.get(Note, note_id)
    if not note:
        return False
    session.delete(note)
    session.commit()
    return True

def get_by_public_id(session: Session, public_id: str) -> Optional[Note]:
    return session.exec(select(Note).where(Note.public_id == public_id)).first()
