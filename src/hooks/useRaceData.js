import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

export function useRaceData(url) {
  const { data: raceData, error: raceDataError, loading: raceDataLoading } = useFetch(url);
  const [visibleHorses, setVisibleHorses] = useState({});
  const [sortedHorses, setSortedHorses] = useState([]);

  useEffect(() => {
    if (raceData && Array.isArray(raceData.horse_data)) {
      // Replicate the Python logic in JavaScript
      const outsiders = raceData.horse_data.filter(horse => horse.todays_betfair_win_sp > 16).map(horse => horse.horse_id);
      const longBreak = raceData.horse_data.filter(horse => horse.todays_days_since_last_ran > 60).map(horse => horse.horse_id);
      const shortBreak = raceData.horse_data.filter(horse => horse.todays_days_since_last_ran <= 6).map(horse => horse.horse_id);
      
      const visible = new Set([...longBreak, ...shortBreak, ...outsiders]);

      // Assign initial_visibility based on the conditions
      const updatedHorseData = raceData.horse_data.map(horse => ({
        ...horse,
        initial_visibility: !visible.has(horse.horse_id)
      }));

      // Sort the horse data based on bf_decimal_sp_win in ascending order
      const sorted = [...updatedHorseData].sort((horseA, horseB) => {
        return horseB.bf_decimal_sp_win - horseA.bf_decimal_sp_win;
      });

      // Map the horse data to a visibility object
      const initialVisibility = sorted.reduce((acc, horse) => {
        acc[horse.horse_id] = horse.initial_visibility;
        return acc;
      }, {});

      setVisibleHorses(initialVisibility);
      setSortedHorses(sorted);
    }
  }, [raceData]);

  return { raceData, raceDataError, raceDataLoading, visibleHorses, setVisibleHorses, sortedHorses };
};