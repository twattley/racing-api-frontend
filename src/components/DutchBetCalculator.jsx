import React, { useState, useEffect } from "react";

function calculateDutchBet(horses) {
  const totalStake = 100;
  const totalOdds = horses.reduce((sum, horse) => sum + 1 / horse.odds, 0);
  const unitStake = totalStake / totalOdds;

  return horses.map((horse) => ({
    ...horse,
    stake: (unitStake / horse.odds).toFixed(2),
  }));
}

export function DutchBetCalculator({ selectedHorses, onRemoveHorse }) {
  const [dutchBet, setDutchBet] = useState([]);

  useEffect(() => {
    setDutchBet(calculateDutchBet(selectedHorses));
  }, [selectedHorses]);

  if (selectedHorses.length === 0) {
    return null;
  }

  const combinedOdds = (
    1 / dutchBet.reduce((sum, horse) => sum + 1 / horse.odds, 0)
  ).toFixed(2);

  return (
    <div className="bg-white p-4 shadow-lg mt-8" style={{ maxWidth: "500px" }}>
      <h2 className="text-xl font-bold mb-4">Dutch Bet Calculator</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Horse
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Odds
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Stake
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dutchBet.map((horse) => (
            <tr key={horse.id}>
              <td className="border border-gray-300 px-4 py-2 truncate">
                {horse.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {horse.odds.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                £{horse.stake}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => onRemoveHorse(horse.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 font-bold text-lg">Combined Odds: {combinedOdds}</p>
    </div>
  );
}
