import React from "react";
import AvailabilityComponent from "@/components/availability/AvailabilityComponent";
import { Button } from "@/components/ui/button";
// import TimezoneDropdown from "@/components/availability/timezone";
import ExceptionAvailabilityContainer from "@/containers/doctor/exceptionAvailability";
import { AvailabilityPresentationProps } from "../types";

const AvailabilityPresentation: React.FC<AvailabilityPresentationProps> = ({
  reduxLoading,
  weekDays,
  timeSlots,
  availability,
  setAvailability,
  toggleDropdown,
  handleTimeChange,
  errors,
  handleSave,
  disabled,
}) => {
  if (reduxLoading) {
    return <div className="mt-14"></div>;
  }

  const hasErrors = Object.values(errors || {}).some((error) => error !== "");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-center font-bold text-2xl mb-6">Availability</h1>
        <div className="mb-10 text-gray-500 font-sans">
          Set your weekly availability for your patients
        </div>

        {/* <div className="flex mb-2 gap-4 items-center">
          <span className="text-xl text-black font-semibold">Time Zone :</span>
          <div>
            <TimezoneDropdown />
          </div>
        </div> */}

        <div className="flex flex-col lg:flex-row border rounded-2xl shadow-md p-6 w-full">
          <div className="lg:w-1/2 lg:border-r-2 border-b-2 p-4">
            <AvailabilityComponent
              weekDays={weekDays}
              availability={availability}
              timeSlots={timeSlots}
              toggleDropdown={toggleDropdown}
              handleTimeChange={handleTimeChange}
              errors={errors}
              setAvailability={setAvailability}
            />

            <div className="flex justify-center mt-6">
              <Button
                onClick={handleSave}
                disabled={disabled || hasErrors}
                className={`mt-4 border-2 px-10 py-2 rounded ${
                  disabled || hasErrors
                    ? "bg-gray-300 border-gray-400 text-gray-600 hover:cursor-not-allowed"
                    : "bg-white border-blue-600 text-blue-600 hover:bg-white hover:shadow-lg"
                }`}
              >
                Save
              </Button>
            </div>
          </div>
          <div>
            <ExceptionAvailabilityContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPresentation;
