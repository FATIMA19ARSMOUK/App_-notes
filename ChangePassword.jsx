import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.put(
        "https://notes.devlop.tech/api/update-password",
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError("Failed to change password: " + err.message);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default ChangePassword;
