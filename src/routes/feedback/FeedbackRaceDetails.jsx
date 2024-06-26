import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {RaceDetails} from "../../components/RaceDetails";
import { FeedbackTabs } from "../../components/feedback/Tabs"; 

export function FeedbackRaceDetails() {
  const { race_id } = useParams();
  const {
    data: formData,
    error: formDataError,
    loading: formDataLoading,
  } = useFetch(`/feedback/todays-races/by-race-id?race_id=${race_id}`);

  return (
    <div>
      <FeedbackTabs race_id={race_id} />{" "}
      <RaceDetails
        formData={formData}
        formDataError={formDataError}
        formDataLoading={formDataLoading}
      />
    </div>
  );
}
