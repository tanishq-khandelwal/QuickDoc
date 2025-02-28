import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { DELETE_EXCEPTION_AVAILABILITY } from "@/queries/doctor/availability";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import ExceptionAvailability from "@/components/availability/ExceptionAvailability/ExceptionAvailability";
import { deleteExceptionAvailability, fetchException } from "./actions";

const ExceptionAvailabilityContainer = () => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    dispatch(fetchException(doctorId));
  }, []);

  const [deleteException] = useMutation(DELETE_EXCEPTION_AVAILABILITY);

  const { data } = useSelector(
    (state: RootState) => state?.exceptionAvailability
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

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
        toast.error("Failed to delete exception. Please try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Error deleting exception. Please try later.", {
        id: toastId,
      });
      console.error("Error deleting exception availability:", error);
    }
  };

  return (
    <ExceptionAvailability
      exceptionDates={data}
      showModal={showModal}
      setShowModal={setShowModal}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      handleDelete={handleDelete}
      disabled={disabled}
      setDisable={setDisable}
    />
  );
};

export default ExceptionAvailabilityContainer;
