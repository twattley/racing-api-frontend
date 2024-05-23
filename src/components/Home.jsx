import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleFeedback = () => {
    navigate("/feedback/races");
  }

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={handleFeedback}>Feedback</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
