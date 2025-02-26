export interface AvailabilityDay {
  selected: boolean;
  startTime: string;
  endTime: string;
  openDropdown: string | null;
}

export interface AvailabilityComponentProps {
  weekDays: { id: number; title: string }[];
  availability: { [key: number]: AvailabilityDay };
  timeSlots: string[];
  toggleDropdown: (id: number, field: string | null) => void;
  handleTimeChange: (
    dayId: number,
    field: "startTime" | "endTime",
    value: string
  ) => void;
  errors: { [key: number]: string };
  setAvailability: React.Dispatch<
    React.SetStateAction<{ [key: number]: AvailabilityDay }>
  >;
}

export interface AvailabilityModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
}
