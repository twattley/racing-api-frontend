import React from "react";

export function RacePopup({ raceData, onClose, activeHorseId }) {
  if (!raceData || !raceData.horse_collateral_data) return null;

  const handlePopupClick = (e) => {
    // Prevent the click from propagating to parent elements
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="bg-white border border-gray-300 shadow-lg p-4 rounded-md cursor-pointer"
      onClick={handlePopupClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Race Details</h2>
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {raceData.horse_collateral_data.map((horse) => (
            <React.Fragment key={horse.horse_id}>
              <tr
                className={
                  horse.horse_id === activeHorseId ? "bg-blue-100" : ""
                }
              >
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
              </tr>
              <tr>
                <td colSpan="4" className="px-6 py-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cls
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conditions
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SP
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ptn
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Btn
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          OR
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Speed
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {horse.collateral_form_data.map((form, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.race_class}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.conditions}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.betfair_win_sp}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.finishing_position} / {form.number_of_runners}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.total_distance_beaten}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.official_rating}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.speed_figure}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {form.rating}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-sm text-gray-500">
                  <strong>Main Race Comment:</strong>{" "}
                  {horse.collateral_form_data[0].main_race_comment}
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-sm text-gray-500">
                  <strong>TF Comment:</strong>{" "}
                  {horse.collateral_form_data[0].tf_comment}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
