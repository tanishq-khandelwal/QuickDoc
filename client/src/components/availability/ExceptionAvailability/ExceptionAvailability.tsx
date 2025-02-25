import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import AvailabilityModal from "../AvailabilityModal/AvailabilityModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExceptionAvailability,
  fetchException,
} from "@/redux/actions/doctor/ExceptionAvailabilityAction";
import {map} from "lodash"
import { RootState } from "@/redux/rootReducer";
import { useMutation } from "@apollo/client";
import { DELETE_EXCEPTION_AVAILABILITY } from "@/queries/doctor/availability";
import toast from "react-hot-toast";

const ExceptionAvailability = () => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;
  const[disabled,setDisable]=useState(false);

  useEffect(() => {
    dispatch(fetchException(doctorId));
  }, [dispatch]);

  const [deleteException] = useMutation(
    DELETE_EXCEPTION_AVAILABILITY
  );

  const { data } = useSelector(
    (state: RootState) => state?.exceptionAvailability
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const exceptionDates = data;
  console.log("Exception Availability", exceptionDates);

  const formatTime = (time: string) => {
    return DateTime.fromISO(time).toFormat("hh:mm a");
  };

  const handleDelete = async (availabilityId: number) => {
    const toastId = toast.loading("Deleting exception...");
  
    try {
      const { data } = await deleteException({
        variables: { availabilityId },
      });
  
      if (data) {
        toast.success("Exception deleted successfully", { id: toastId });
        dispatch(deleteExceptionAvailability(availabilityId));
      } else {
        toast.error("Failed to delete exception. Please try again.", { id: toastId });
      }
    } catch (error) {
      toast.error("Error deleting exception. Please try later.", { id: toastId });
      console.error("Error deleting exception availability:", error);
    }
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
                  handleDelete(item?.availability_id),
                  setDisable(true);
                }}
                disabled={disabled}
              >
                <Trash2 className="text-red-600" />
              </Button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ExceptionAvailability;
