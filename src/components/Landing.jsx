import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Landing() {
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
      navigate("/home"); // Or any other route you want to navigate to after login
    } catch (error) {
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-10">RACING API</h2>
        <form onSubmit={handleSubmit} className="flex space-x-6 justify-center">
          <div>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-4 text-xl rounded border border-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 text-xl rounded border border-gray-400"
            />
          </div>
          <button
            type="submit"
            className="p-4 text-xl rounded bg-gray-800 text-white"
          >
            login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-xl">{error}</p>}
      </div>
    </div>
  );
}
