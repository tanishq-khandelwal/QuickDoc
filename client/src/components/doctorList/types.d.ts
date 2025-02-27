export interface Doctor {
  clinic_address: string;
  created_at: string;
  slot_duration: number;
  consultation_fee: number;
  city: string;
  doctor_id: number;
  specialization: string;
  experience_years: number;
  user: {
      name: string;
  };
};

export interface DoctorCardProps {
  doctor: Doctor
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}