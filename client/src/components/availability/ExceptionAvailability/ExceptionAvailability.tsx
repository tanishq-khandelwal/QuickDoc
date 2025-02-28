import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import { map } from "lodash";
import AvailabilityModal from "../AvailabilityModal/AvailabilityModal";
import { ExceptionAvailabilityProps } from "./types";
import React from "react";

const ExceptionAvailability: React.FC<ExceptionAvailabilityProps> = ({
  exceptionDates,
  showModal,
  setShowModal,
  selectedDate,
  setSelectedDate,
  handleDelete,
  disabled,
  setDisable,
}) => {
  const formatTime = (time: string) => {
    return DateTime.fromISO(time).toFormat("hh:mm a");
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-xl">Date-Specific Hours</h2>
      <p className="text-sm text-gray-600 mb-2">
        Override your availability / unavailability for specific dates when your
        hours differ from your regular weekly hours.
      </p>
      <Button
        className="bg-white text-gray-600 border border-gray-600 hover:bg-gray-100 rounded-2xl"
        onClick={() => setShowModal(true)}
      >
        + Add date-specific hours
      </Button>

      <AvailabilityModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="mt-4 ">
        {map(exceptionDates, (item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-3 border border-blue-200 rounded-lg shadow-lg bg-gray-50 mt-2"
          >
            <p className="text-sm font-medium text-gray-700">
              {item.special_date}
            </p>
            <p className="text-sm text-gray-600">
              {item.is_available ? formatTime(item.start_time) : "- -"}
            </p>
            <p className="text-sm text-gray-600">
              {item.is_available ? formatTime(item.end_time) : "- -"}
            </p>
            <p
              className={`text-sm font-semibold ${
                item.is_available ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.is_available ? "Available" : "Not Available"}
            </p>

            <Button
              className="bg-white hover:bg-white"
              onClick={() => {
                handleDelete(item?.availability_id);
                setDisable(true);
              }}
              disabled={disabled}
              data-testid="delete-button"
            >
              <Trash2 className="text-red-600" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExceptionAvailability;
