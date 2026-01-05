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

    return (
        <div className="notes-container">
            <h1 className="notes-title">My Notes</h1>
            <div className="notes-grid">
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        </div>
    );
}

const NoteCard = ({ note }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className={`note-card ${note.isPinned ? "pinned" : ""}`}>
            {note.isPinned && <span className="pin-badge">📌 Pinned</span>}
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
