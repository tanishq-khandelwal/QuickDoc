export interface AvailabilityDay {
  day: string;
  available: boolean;
  start_time: string;
  end_time: string;
  time_zone: string;
}

export interface AppointmentBookingProps {
  data: DoctorData;
  availableDays: AvailabilityDay[];
  exceptionAvailabilities: ExceptionAvailability[];
}

export interface ExceptionAvailability {
  date: string;
  available: boolean;
  start_time: string;
  end_time: string;
  time_zone: string;
}

export interface TimeSlotPickerProps {
  availableTimeSlots: string[];
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  role: string | null;
}

export interface ConfirmationModalProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  selectedDate: Date;
  selectedTime: string | null;
  consultationFee: number;
  handleBookingAppointment: () => void;
}
