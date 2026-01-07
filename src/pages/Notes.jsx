import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import "./Notes.css";

function Notes() {
    const token = useAppSelector((state) => state.auth.value);
    const [notes, setNotes] = useState([]);

    console.log("Token saved = " + token);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch("http://localhost:5002/notes", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                const result = await res.json();
                setNotes(result.notes);
            } catch (err) {
                console.error("Failed to fetch notes", err);
            }
        };

        fetchNotes();
    }, [token]);

    const deleteNote = async (noteId) => {
        try {
            const res = await fetch(`http://localhost:5002/notes/${noteId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            const result = await res.json()
            if(res.status === 200){
                updateNotes(noteId)
            }else{
                console.error("Failed to delete notes : " + result);
            }

        
        } catch (err) {
            console.error("Failed to delete notes", err);
        }
    }

    function updateNotes(noteId) {
        setNotes(notes.filter( note => note._id !== noteId ))
    }

    return (
        <div className="notes-container">
            <h1 className="notes-title">My Notes</h1>
            <div className="notes-grid">
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} onDelete={deleteNote} />
                ))}
            </div>
        </div>
    );
}

const NoteCard = ({ note, onDelete }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(note._id);
    };

    return (
        <div className={`note-card ${note.isPinned ? "pinned" : ""}`}>
            {note.isPinned && <span className="pin-badge">📌 Pinned</span>}
            <button className="delete-btn" onClick={handleDelete} title="Delete note">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
            <h3 className="note-card-title">{note.title}</h3>
            <p className="note-card-content">{note.content}</p>
            {note.tags && note.tags.length > 0 && (
                <div className="note-tags">
                    {note.tags.map((tag, index) => (
                        <span key={index} className="note-tag">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="note-card-footer">
                <span className="note-date">{formatDate(note.createdAt)}</span>
            </div>
        </div>
    );
};

const NoteDetailsPopup = () => {
    
}

export default Notes;
