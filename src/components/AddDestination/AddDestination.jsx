import { useEffect, useState } from "react";
import { usePlannerMapContext } from "../../Contexts/PlannerMapContext";

const AddDestination = (props) => {
  const { selectedDates } = props;

  const { setSelectedDay, selectedPlanDate, handleDeleteSelectedPlanDate } =
    usePlannerMapContext();

  const clickPlaces = Object.values(selectedPlanDate);
  const clickPlacesKeys = Object.keys(selectedPlanDate);

  useEffect(() => {}, [selectedPlanDate]);

  const handleClickDateButton = (date) => {
    const formatDate = `${date.year}-${date.month}-${date.date}`;
    setSelectedDay(formatDate);
  };

  if (selectedDates.length > 0) {
    return (
      <div>
        <h1>날짜를 선택하고 장소를 추가하세요</h1>
        <div
          className="flex flex-col items-center mt-4 bg-white drop-shadow"
          style={{
            width: "320px",
            height: "300px",
            whiteSpace: "nowrap",
            overflow: "auto",
          }}
        >
          {/* 첫 번째 요소 */}
          {selectedDates.map((date, index, selectedPlaces) => {
            return (
              <div>
                <div>
                  <button
                    className="w-40 h-8 mt-4 rounded"
                    style={{
                      backgroundColor: "#E9EBED",
                      color: "#B09FCE",
                    }}
                    key={index}
                    data={selectedPlaces}
                    onClick={() => handleClickDateButton(date)}
                  >
                    DAY {index + 1}
                  </button>
                </div>
                <div>
                  {selectedPlanDate &&
                    selectedPlanDate[
                      `${date.year}-${date.month}-${date.date}`
                    ] &&
                    selectedPlanDate[
                      `${date.year}-${date.month}-${date.date}`
                    ].map((a) => {
                      return (
                        <div className="p-4 mt-3 border-2 rounded shadow-lg info box-sizing: border-box h-13 w-50">
                          <div className="text-sm font-bold">
                            {a.place_name}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="text-xs">
                              {a.category_group_name}
                            </span>
                            <img
                              src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v1/24px.svg"
                              alt="remove icon"
                              className="cursor-pointer"
                              // onClick={() => handleDeleteSelectedPlanDate()}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default AddDestination;
