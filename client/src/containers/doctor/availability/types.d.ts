export interface AvailabilityDay {
  selected: boolean;
  startTime: string;
  endTime: string;
  openDropdown: string | null;
}

export interface AvailabilityContainerProps {
  data: any;
  reduxLoading: boolean;
  doctorId: number;
}

