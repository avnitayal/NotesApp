from typing import Optional
from sqlmodel import SQLModel, Field
import uuid

class NoteBase(SQLModel):
    title: str
    content: Optional[str] = ""

class Note(NoteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    public_id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class NoteCreate(NoteBase):
    pass

class NoteRead(NoteBase):
    id: int
    public_id: str

class NoteUpdate(SQLModel):
    title: Optional[str] = None
    content: Optional[str] = None
