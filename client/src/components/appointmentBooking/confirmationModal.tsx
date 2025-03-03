import { useRef } from "react";
import CheckoutButton from "@/stripe/checkoutForm";
import { DateTime } from "luxon";
import { ConfirmationModalProps } from "./types";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showConfirmModal,
  setShowConfirmModal,
  selectedDate,
  selectedTime,
  consultationFee,
  handleBookingAppointment,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const convertTo12HourFormat = (slot: string): string => {
    return DateTime.fromFormat(slot, "HH:mm").toFormat("h:mm a");
  };

  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h3 className="text-xl font-bold mb-4 text-center">
          Confirm Appointment
        </h3>
        <p className="mb-2">
          Are you sure you want to book an appointment for:
        </p>
        <div className="mb-4 bg-gray-50 p-3 rounded-md">
          <p className="font-medium">
            Date:{" "}
            <span className="text-red-600">
              {selectedDate?.toLocaleDateString()}
            </span>
          </p>
          <p className="font-medium">
            Time:{" "}
            <span className="text-red-600">
              {selectedTime && convertTo12HourFormat(selectedTime)}
            </span>{" "}
            (
            {Intl.DateTimeFormat().resolvedOptions().timeZone ===
            "Asia/Calcutta"
              ? "IST"
              : new Intl.DateTimeFormat("en-US", {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  timeZoneName: "short",
                })
                  .formatToParts(new Date())
                  .find((part) => part.type === "timeZoneName")?.value}
            )
          </p>
          <p className="font-medium">
            Fee: <span className="text-green-600">{consultationFee}</span>
          </p>
        </div>
        <p className="mb-6 text-sm text-gray-600">
          Clicking "Book Appointment" will redirect you to the payment page.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 border-2 border-gray-500"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <CheckoutButton
            onSuccess={handleBookingAppointment}
            price={consultationFee}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
