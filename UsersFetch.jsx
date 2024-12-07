import React, { useState, useEffect } from "react";
import axios from "axios";

function UsersFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://notes.devlop.tech/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched users:", response.data); 
        setUsers(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }
console.log(users);

  return (
    <div>
      <h2>Fetched Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.first_name} {user.last_name} 
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UsersFetch;
