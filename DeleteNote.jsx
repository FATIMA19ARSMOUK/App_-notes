import React from "react";
import axios from "axios";

function DeleteNote({ noteId, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://notes.devlop.tech/api/notes/${noteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onDelete(noteId); 
      } catch (err) {
        alert("Failed to delete note");
      }
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteNote;
