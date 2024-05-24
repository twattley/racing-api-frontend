import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  const url = useMemo(
    () => `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
    [endpoint]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken) {
        console.log("No auth token available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, authToken]);

  return { data, error, loading };
}
