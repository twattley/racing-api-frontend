import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {RaceDetails} from "../../components/RaceDetails";
import { TodaysTabs } from "../../components/today/Tabs"; 

export function TodaysRaceDetails() {
  const { race_id } = useParams();
  const {
    data: formData,
    error: formDataError,
    loading: formDataLoading,
  } = useFetch(`/today/todays-races/by-race-id?race_id=${race_id}`);

  return (
    <div>
      <TodaysTabs race_id={race_id} />{" "}
      <RaceDetails
        formData={formData}
        formDataError={formDataError}
        formDataLoading={formDataLoading}
      />
    </div>
  );
}
