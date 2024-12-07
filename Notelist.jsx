import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Notelist() {
  const [notes, setNotes] = useState([]); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("https://notes.devlop.tech/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (err) {
      alert("Failed to fetch notes: " + err.message);
    }
  };

 
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
  
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Actions: Add Note */}
      <div className="actions">
        <Link to="/notes/create">
          <button className="add-note-btn">Add Note</button>
        </Link>
      </div>

      {/* Notes list */}
      <div className="card-container">
        {notes.map((note) => (
          <div key={note.id} className="card">
            <h3>{note.title}</h3>
            <p>
              {note.content
                ? note.content.slice(0, 50) + "..."
                : "No content available"}
            </p>

            <div className="card-actions">
              {/* Edit Button */}
              <Link to={`/notes/edit/${note.id}`}>
                <button className="action-btn">Edit</button>
              </Link>

              {/* Delete Button */}
              <button
                className="logout-btn"
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  try {
                    await axios.delete(`https://notes.devlop.tech/api/notes/${note.id}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setNotes(notes.filter((n) => n.id !== note.id));
                    setSuccessMessage("Note deleted successfully!");
                    setErrorMessage(""); 
                  } catch (err) {
                    setErrorMessage("Failed to delete the note: " + err.message);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notelist;
