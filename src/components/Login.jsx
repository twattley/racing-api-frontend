import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await loginService(username, password);
      login(response.access_token);
      navigate("/home");
    } catch (error) {
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
