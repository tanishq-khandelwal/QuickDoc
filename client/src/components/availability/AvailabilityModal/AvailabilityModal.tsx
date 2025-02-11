import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@apollo/client";
import { UPDATE_EXCEPTION_AVAILABILITY } from "@/queries/doctor/availability";
import toast from "react-hot-toast";

interface AvailabilityModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
}

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  showModal,
  setShowModal,
  selectedDate,
  setSelectedDate,
}) => {
  if (!showModal) return null;

  const [isAvailable, setIsAvailable] = useState(true);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const today = new Date();

  // Set default date on mount
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate, today]);

  const [updateAvailability, { loading, error }] = useMutation(
    UPDATE_EXCEPTION_AVAILABILITY
  );

  const onSave = async () => {
    toast.loading("Loading",{id:"loading"})
    if (!selectedDate || !startTime || !endTime) {
      console.error("Please select a date and time.");
      return;
    }

    const userData = localStorage.getItem("user");
    const doctorId = userData ? JSON.parse(userData).doctorId : null;

    const data = {
      doctorId: doctorId, 
      startTime,
      endTime,
      available: isAvailable,
      date: selectedDate.toISOString().split("T")[0],
    };

    console.log("Saving data:", data);

    try {
      const response = await updateAvailability({ variables: data  });
      console.log("Response:", response);
      toast.dismiss("loading");
      toast.success("Availability Updated Successfully")
      setShowModal(false);
    } catch (err) {
      toast.dismiss("loading");
      toast.error(`Failed to update Availability,${err}`)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Select the date and assign availability
        </h2>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="mb-6 rounded-lg border p-4"
          disabled={(date) => date < today}
        />

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <label htmlFor="start" className="text-gray-600 font-medium">
              Start Time:
            </label>
            <input
              type="time"
              id="start"
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isAvailable}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="end" className="text-gray-600 font-medium">
              End Time:
            </label>
            <input
              type="time"
              id="end"
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isAvailable}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="cursor-pointer text-blue-600"
            />
            <label htmlFor="available" className="text-gray-600">
              Available
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none"
            disabled={loading}
          >
            {loading ? "Saving..." : "Confirm"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </div>
    </div>
  );
};

export default AvailabilityModal;
