import React from "react";

export function RacePopup({ raceData, onClose }) {
  if (!raceData || !raceData.horse_collateral_data) return null;

  return (
    <div
      className="bg-white border border-gray-300 shadow-lg p-4 rounded-md overflow-auto"
      style={{ maxHeight: "80vh", maxWidth: "90vw" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Race Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Horse
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              OR
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dist Diff
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Collateral Form
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {raceData.horse_collateral_data.map((horse) => (
            <tr key={horse.horse_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {horse.horse_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {horse.betfair_win_sp}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {horse.official_rating}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {horse.distance_difference}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <ul>
                  {horse.collateral_form_data.map((form, index) => (
                    <li key={index} className="mb-2">
                      {form.race_date.toString()}: {form.finishing_position} /{" "}
                      {form.number_of_runners}
                      (OR: {form.official_rating}, SP: {form.betfair_win_sp})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
