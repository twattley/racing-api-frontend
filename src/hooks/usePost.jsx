import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

export function usePost(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authToken } = useAuth();

  const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

  const postData = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);

      if (!authToken) {
        console.log("No auth token available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        console.error("Failed to post data:", error);
      } finally {
        setLoading(false);
      }
    },
    [url, authToken, options]
  );

  return { data, error, loading, postData };
}
