import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); 
        return;
      }

      try {
        const response = await axios.get("https://notes.devlop.tech/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data); 
      } catch (err) {
        alert("Failed to fetch users: " + err.message);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    try {
      const noteResponse = await axios.post(
        "https://notes.devlop.tech/api/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const noteId = noteResponse.data.id; 

     

      navigate("/notes"); 
    } catch (err) {
      alert("Failed to create note: " + err.message);
    }
  };

  return (
    <div className="create-note-container">
      <h2>Create Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="create-note-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="create-note-textarea"
      />
      
         
       
       
     
      <button onClick={handleCreate} className="create-note-btn">
        Create Note
      </button>
    </div>
  );
}

export default CreateNote;
