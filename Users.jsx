import React, { useState, useEffect } from "react";
import axios from "axios";

function ShareNote({ noteId }) {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false); 
  const [loadingShare, setLoadingShare] = useState(false);

  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://notes.devlop.tech/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setErrorMessage("");
      } catch (err) {
        setErrorMessage("Failed to fetch users: " + err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

 
  const handleShare = async () => {
    if (!selectedUser) {
      setErrorMessage("Please select a user to share the note.");
      return;
    }

    setLoadingShare(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://notes.devlop.tech/api/notes/${noteId}/share`,
        { shared_with: [selectedUser] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Note shared successfully!");
      setErrorMessage(""); 
    } catch (err) {
      setErrorMessage("Failed to share the note: " + err.message);
    } finally {
      setLoadingShare(false);
    }
  };

  return (
    <div>
      <h2>Share Note</h2>

    
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {loadingUsers ? (
        <p>Loading users...</p>
      ) : (
        <>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button onClick={handleShare} disabled={!selectedUser || loadingShare}>
            {loadingShare ? "Sharing..." : "Share Note"}
          </button>
        </>
      )}
    </div>
  );
}

export default ShareNote;
