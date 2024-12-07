import React, { useState } from "react";
import axios from "axios";
import '../global.css'; 


function Login({ setIsConnected }) {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('https://notes.devlop.tech/api/login', { cin, password })
      .then(response => {
        const token = response.data.token; 
        localStorage.setItem('token', token); 
        setIsConnected(true); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Login error:', error);
        setError('Invalid CIN or password.');
        setLoading(false);
      });
  };

  return (
    <div className="login-card">
  <h2 className="login-title">Welcome 👋</h2>
  <p className="login-subtitle">Sign in to your account</p>
  <form className="login-form" onSubmit={handleLogin}>
    <div className="form-group">
      <label htmlFor="cin">CIN</label>
      <input
        id="cin"
        type="text"
        placeholder="Enter your CIN"
        value={cin}
        onChange={(e) => setCin(e.target.value)}
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input"
      />
    </div>
    <button type="submit" className="login-button" disabled={loading}>
      {loading ? "Logging in..." : "Login"}
    </button>
  </form>
  {error && <p className="error-message">{error}</p>}
  <div className="register-link">
    <p>
      Don't have an account? <a href="/register">Register</a>
    </p>
  </div>
</div>
  );
}

export default Login;
