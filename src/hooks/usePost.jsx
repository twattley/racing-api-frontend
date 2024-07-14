import { useState, useCallback } from "react";

export function usePost(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

  const postData = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    [url]
  );

  return { data, error, loading, postData };
}
