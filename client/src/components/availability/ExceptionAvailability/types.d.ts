export interface ExceptionAvailabilityProps {
    exceptionDates: any[];
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    selectedDate: Date | undefined;
    setSelectedDate: (date: Date | undefined) => void;
    handleDelete: (availabilityId: number) => void;
    disabled: boolean;
    setDisable: (disabled: boolean) => void;
  }