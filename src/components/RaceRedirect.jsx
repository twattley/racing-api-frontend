import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";

function RaceRedirect({ raceId }) {
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(`/api/races/${raceId}`);

  useEffect(() => {
    if (data) {
      // Assuming the API returns a 'type' field to determine if it's a feedback or today's race
      const path =
        data.type === "feedback"
          ? `/feedback_race/${raceId}`
          : `/todays_race/${raceId}`;
      navigate(path);
    }
  }, [data, navigate, raceId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return null;
}

export default RaceRedirect;
