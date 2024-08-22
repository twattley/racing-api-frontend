import React from "react";

export function RacePopup({ raceData, onClose, activeHorseId }) {
  if (!raceData || !raceData.horse_collateral_data) return null;

  const handlePopupClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  console.log(raceData);
  const isImportantResult = (form) => {
    const finishingPosition = form.finishing_position.toString();
    const totalDistanceBeaten = parseFloat(form.total_distance_beaten);
    const numberOfRunners = parseInt(form.number_of_runners, 10);

    const isTopTwoFinish = ["1", "2"].includes(finishingPosition);
    const isCloseFinish = totalDistanceBeaten < 2;
    const isTopThreeInSmallField =
      ["1", "2", "3"].includes(finishingPosition) && numberOfRunners >= 12;
    const isTopFourInLargeField =
      ["1", "2", "3", "4"].includes(finishingPosition) && numberOfRunners >= 16;

    return (
      isTopTwoFinish ||
      isCloseFinish ||
      isTopThreeInSmallField ||
      isTopFourInLargeField
    );
  };

  return (
    <div
      className="bg-white border border-gray-300 shadow-lg p-4 rounded-md cursor-pointer"
      onClick={handlePopupClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Race Details</h2>
        <h3 className="text-xl font-bold">
          | <b>{raceData.average_collateral_rating}</b> |
        </h3>
        <h3 className="text-xl font-bold">
          | {raceData.important_result_count} /{" "}
          {raceData.valid_collateral_performance_count} |
        </h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Collateral Form
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <b>
                    <i>{horse.distance_difference}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="px-6 py-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conditions
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ptn
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Btn
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
                          className={`
                            ${
                              isImportantResult(form)
                                ? "bg-blue-600 text-white font-bold"
                                : index % 2 === 0
                                ? "bg-gray-50"
                                : "bg-white"
                            }
                          `}
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {form.conditions}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {form.finishing_position} / {form.number_of_runners}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {form.total_distance_beaten}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {form.rating}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
