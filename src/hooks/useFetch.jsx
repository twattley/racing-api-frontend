import { useState, useEffect, useMemo } from "react";

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = useMemo(
    () => (endpoint ? `${import.meta.env.VITE_API_BASE_URL}${endpoint}` : null),
    [endpoint]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, {
          headers: {},
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
  }, [url]);

  return { data, error, loading };
}
