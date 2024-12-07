import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`https://notes.devlop.tech/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },  
        });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        alert("Failed to fetch note: " + err.message);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://notes.devlop.tech/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }  
      );
      navigate("/notes"); 
    } catch (err) {
      alert("Failed to update note: " + err.message);
    }
  };

  return (
    <div className="edit-note-container">
      <h2>Edit Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="edit-note-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="edit-note-textarea"
      />
      <button onClick={handleEdit} className="edit-note-btn">Save Changes</button>
    </div>
  );
}

export default EditNote;
