import { useState, useEffect } from "react";
import { useFetch } from "./useFetch"; // Make sure this path is correct

export function useRaceData(url) {
  const { data: raceData, error: raceDataError, loading: raceDataLoading } = useFetch(url);
  const [visibleHorses, setVisibleHorses] = useState({});
  const [sortedHorses, setSortedHorses] = useState([]);

  const resetVisibility = (filters = {}) => {
    if (raceData && Array.isArray(raceData.horse_data)) {
      console.log('RACE DATA:', raceData.horse_data);
  
      const outsiders = filters.outsiders ? raceData.horse_data
        .filter(horse => horse.todays_betfair_win_sp > 16)
        .map(horse => horse.horse_id) : [];
      const longBreak = filters.longBreak ? raceData.horse_data
        .filter(horse => horse.todays_days_since_last_ran > 52)
        .map(horse => horse.horse_id) : [];
      const shortBreak = filters.shortBreak ? raceData.horse_data
        .filter(horse => horse.todays_days_since_last_ran <= 6)
        .map(horse => horse.horse_id) : [];
      const figureVisibility = filters.figureVisibility ? raceData.horse_data
        .filter(horse => horse.todays_figure_visibility === false)
        .map(horse => horse.horse_id) : [];
      const varianceVisibility = filters.varianceVisibility ? raceData.horse_data
        .filter(horse => horse.todays_variance_visibility === false)
        .map(horse => horse.horse_id) : [];
  
      console.log('OUTSIDERS:', outsiders);
      console.log('LONG BREAK:', longBreak);
      console.log('SHORT BREAK:', shortBreak);
      console.log('FIGURE VISIBILITY:', figureVisibility);
      console.log('VARIANCE VISIBILITY:', varianceVisibility);
  
      const visible = new Set([
        ...longBreak,
        ...shortBreak,
        ...outsiders,
        ...figureVisibility,
        ...varianceVisibility,
      ]);
  
      console.log('VISIBLE SET:', visible);
  
      const updatedHorseData = raceData.horse_data.map(horse => ({
        ...horse,
        initial_visibility: !visible.has(horse.horse_id),
      }));
  
      const sorted = [...updatedHorseData].sort((horseA, horseB) => {
        return horseB.bf_decimal_sp_win - horseA.bf_decimal_sp_win;
      });
  
      const initialVisibility = sorted.reduce((acc, horse) => {
        acc[horse.horse_id] = horse.initial_visibility;
        return acc;
      }, {});
  
      setVisibleHorses(initialVisibility);
      setSortedHorses(sorted);
    }
  };

  useEffect(() => {
    resetVisibility();
  }, [raceData]);

  return { raceData, raceDataError, raceDataLoading, visibleHorses, setVisibleHorses, sortedHorses, resetVisibility };
}