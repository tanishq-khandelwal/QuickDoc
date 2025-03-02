export interface AppointmentType  {
  appointment_id: number;
  appointment_date: string;
  patient_id: number;
  start_time: string;
  end_time: string;
  patient_time_zone: string;
  status: string;
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
};

export interface appointmentCardProps  {
  appointment: AppointmentType;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onComplete: (id: number) => void;
  getStatusColor: (status: string) => string;
  formatTime: (date: string, time: string, zone: string) => string;
};