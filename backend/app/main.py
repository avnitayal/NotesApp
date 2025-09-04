from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from typing import Optional, List

# Initialize FastAPI app
app = FastAPI()

# ✅ Enable CORS for React (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

# Database model
class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str

# SQLite database setup
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

# Create database tables on startup
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Routes
@app.get("/")
def root():
    return {"message": "server start"}

@app.get("/notes", response_model=List[Note])
def get_notes():
    with Session(engine) as session:
        notes = session.exec(select(Note)).all()
        return notes

@app.post("/notes", response_model=Note)
def create_note(note: Note):
    with Session(engine) as session:
        session.add(note)
        session.commit()
        session.refresh(note)
        return note

@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: int, updated_note: Note):
    with Session(engine) as session:
        note = session.get(Note, note_id)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        note.content = updated_note.content
        session.add(note)
        session.commit()
        session.refresh(note)
        return note

@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    with Session(engine) as session:
        note = session.get(Note, note_id)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        session.delete(note)
        session.commit()
        return {"message": "Note deleted successfully"}
