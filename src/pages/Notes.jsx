import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

function Notes() {
    const token = useAppSelector((state) => state.auth.value)
    const [notes, setNotes] = useState([]);

    console.log("Token saved = " + token)

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
        <>
            <h1>Notes Page</h1>
            {notes.map((note) => (
                <SingleNote key={note._id} note={note} />
            ))}
        </>
    );
}

const SingleNote = ({ note }) => {
    return (
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
        </div>
    );
};

export default Notes;
