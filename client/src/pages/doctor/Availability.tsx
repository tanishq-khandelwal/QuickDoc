import { useState } from "react";
import Layout from "@/Layout";
import { Button } from "@/components/ui/button"; // Import the date picker library
import { Calendar } from "@/components/ui/calendar";
import { Navbar } from "@/Navbar";

interface AvailabilityDay {
  selected: boolean;
  startTime: string;
  endTime: string;
  openDropdown: string | null;
}

const Availability = () => {
  const weekDays = [
    { id: 1, title: "Sunday" },
    { id: 2, title: "Monday" },
    { id: 3, title: "Tuesday" },
    { id: 4, title: "Wednesday" },
    { id: 5, title: "Thursday" },
    { id: 6, title: "Friday" },
    { id: 7, title: "Saturday" },
  ];

  const timeSlots = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const [availability, setAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>(
    weekDays.reduce((acc, day) => {
      acc[day.id] = {
        selected: false,
        startTime: "",
        endTime: "",
        openDropdown: null,
      };
      return acc;
    }, {})
  );

  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  ); // State for selected date

  const toggleDay = (id: number) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id].selected },
    }));
  };

  const updateTime = (
    id: number,
    field: keyof AvailabilityDay,
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const toggleDropdown = (id: number, field: string | null) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        openDropdown: prev[id].openDropdown === field ? null : field,
      },
    }));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null); // Reset the date when closing
  };

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 mt-8 ">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 ">
          <h1 className="text-center font-bold text-2xl mb-6">Availability</h1>

          <div>
            <div className="mb-10 text-gray-500 font-sans">Set your weekly availability for your patients</div>
          </div>

          <div className="flex flex-col lg:flex-row border rounded-2xl shadow-md p-6 w-full">
            <div className="lg:w-1/2 border-r-2 p-4">
              <h2 className="text-xl font-semibold mb-4">Weekly Hours</h2>
              <div className="space-y-4">
                {weekDays.map((day) => (
                  <div
                    key={day.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={availability[day.id].selected}
                        onChange={() => toggleDay(day.id)}
                        className="w-5 h-5 accent-blue-500 cursor-pointer"
                      />
                      <span className="text-lg font-medium">{day.title}</span>
                    </div>
                    {!availability[day.id].selected ? (
                      <div className="text-gray-600">Unavailable</div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={availability[day.id].startTime || "9:00 AM"}
                          onClick={() => toggleDropdown(day.id, "startTime")}
                          className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                        />
                        <span className="text-lg font-medium">-</span>
                        <input
                          type="text"
                          value={availability[day.id].endTime || "9:00 PM"}
                          onClick={() => toggleDropdown(day.id, "endTime")}
                          className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 p-4">
              <h2 className="font-semibold text-xl">Date-Specific Hours</h2>
              <p className="text-sm text-gray-600 mb-2">
                Override your availability for specific dates when your hours
                differ from your regular weekly hours.
              </p>
              <Button
                className="bg-white text-gray-600 border border-gray-600 hover:bg-gray-100 rounded-2xl"
                onClick={handleOpenModal}
              >
                + Add date-specific hours
              </Button>
            </div>
          </div>
        </div>

        {/* Modal for adding date-specific hours */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4 text-gray-600">
                Select the date(s) you want to assign specific hours
              </h2>
              <div className="items-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Handle saving the selected date
                    handleCloseModal();
                  }}
                  className="bg-blue-500 text-white hover:bg-blue-500"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        {/* <div className="mt-7">
          <div>
            <Button className="px-6 py-2">Save</Button>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Availability;
