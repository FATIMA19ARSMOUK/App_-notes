import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import List from './components/Notelist';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import ChangePassword from './components/ChangePassword';
import axios from 'axios';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get('https://notes.devlop.tech/api/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setIsConnected(true))
        .catch(() => {
          localStorage.removeItem("token");
          setIsConnected(false);
        });
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={!isConnected ? <Login setIsConnected={setIsConnected} /> : <Navigate to="/notes" />}
          />
          <Route
            path="/notes"
            element={isConnected ? <List /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/create"
            element={isConnected ? <CreateNote /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/edit/:id"
            element={isConnected ? <EditNote /> : <Navigate to="/login" />}
          />
          <Route
            path="/change-password"
            element={isConnected ? <ChangePassword /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isConnected ? "/notes" : "/login"} />}
          />
        </Routes>

        {isConnected && (
          <div>
            <button onClick={handleLogout} style={{ margin: "20px" }}>
              Logout
            </button>
            <button onClick={() => window.location.href = "/change-password"} style={{ margin: "20px" }}>
              Change Password
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
