import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { DELETE_EXCEPTION_AVAILABILITY } from "@/queries/doctor/availability";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import ExceptionAvailability from "@/components/availability/ExceptionAvailability";
import { deleteExceptionAvailability, fetchException } from "./actions";

const ExceptionAvailabilityContainer = () => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;
  const [disabled, setDisable] = useState(false);
  
  // Ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null);

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
  
  // New state for delete confirmation modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  // Handle click outside the modal
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowDeleteConfirmation(false);
      setPendingDeleteId(null);
    }
  };

  // Add and remove event listener for outside clicks
  useEffect(() => {
    if (showDeleteConfirmation) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDeleteConfirmation]);

  // Modified to show confirmation modal first
  const confirmDelete = (availabilityId: number) => {
    setPendingDeleteId(availabilityId);
    setShowDeleteConfirmation(true);
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
        setDisable(false);
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
    } finally {
      setShowDeleteConfirmation(false);
      setPendingDeleteId(null);
    }
  };

  const DeleteConfirmationModal = () => {
    if (!showDeleteConfirmation) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div 
          ref={modalRef}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        >
          <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
          <p className="mb-6">
            Are you sure you want to delete the Exception availability for this day?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 border-2 border-gray-500"
              onClick={() => {
                setShowDeleteConfirmation(false);
                setPendingDeleteId(null);
                setDisable(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              onClick={() => pendingDeleteId && handleDelete(pendingDeleteId)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ExceptionAvailability
        exceptionDates={data}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleDelete={confirmDelete}
        disabled={disabled}
        setDisable={setDisable}
      />
      <DeleteConfirmationModal /> {/* Added confirmation modal */}
    </>
  );
};

export default ExceptionAvailabilityContainer;