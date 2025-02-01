import { useEffect, useState } from "react";
import Layout from "@/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Navbar } from "@/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailability } from "@/redux/actions/doctor/availabilityAction";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";

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

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.appointment
  );

  useEffect(() => {
    dispatch(fetchAvailability());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

  const [availability, setAvailability] = useState<{ [key: number]: AvailabilityDay }>({});

  useEffect(() => {
    if (data?.data?.doctor_availability) {
      const appointmentData = data.data.doctor_availability;
      setAvailability(
        weekDays.reduce((acc, day) => {
          const appointment = appointmentData.find(
            (appt: any) => appt.available_days === day.title
          );
          acc[day.id] = {
            selected: !!appointment,
            startTime: appointment ? appointment.start_time : "",
            endTime: appointment ? appointment.end_time : "",
            openDropdown: null,
          };
          return acc;
        }, {} as { [key: number]: AvailabilityDay })
      );
    }
  }, [data]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <Navbar />
      {loading ? (
        <div className="mt-14">Loading...</div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 mt-8">
          <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-center font-bold text-2xl mb-6">Availability</h1>
            <div className="mb-10 text-gray-500 font-sans">
              Set your weekly availability for your patients
            </div>

            <div className="flex flex-col lg:flex-row border rounded-2xl shadow-md p-6 w-full">
              <div className="lg:w-1/2 border-r-2 p-4">
                <h2 className="text-xl font-semibold mb-4">Weekly Hours</h2>
                <div className="space-y-4">
                  {weekDays.map((day) => (
                    <div key={day.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={availability[day.id]?.selected || false}
                          onChange={() =>
                            setAvailability((prev) => ({
                              ...prev,
                              [day.id]: { ...prev[day.id], selected: !prev[day.id].selected },
                            }))
                          }
                          className="w-5 h-5 accent-blue-500 cursor-pointer"
                        />
                        <span className="text-lg font-medium">{day.title}</span>
                      </div>
                      {!availability[day.id]?.selected ? (
                        <div className="text-gray-600">Unavailable</div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={availability[day.id]?.startTime || "9:00 AM"}
                            onClick={() =>
                              setAvailability((prev) => ({
                                ...prev,
                                [day.id]: { ...prev[day.id], openDropdown: "startTime" },
                              }))
                            }
                            className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                          />
                          <span className="text-lg font-medium">-</span>
                          <input
                            type="text"
                            value={availability[day.id]?.endTime || "9:00 PM"}
                            onClick={() =>
                              setAvailability((prev) => ({
                                ...prev,
                                [day.id]: { ...prev[day.id], openDropdown: "endTime" },
                              }))
                            }
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
                  onClick={() => setShowModal(true)}
                >
                  + Add date-specific hours
                </Button>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-gray-600">
                  Select the date(s) you want to assign specific hours
                </h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 flex justify-end gap-2">
                  <Button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 hover:bg-gray-300">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Handle saving the selected date
                      setShowModal(false);
                    }}
                    className="bg-blue-500 text-white hover:bg-blue-500"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Availability;
