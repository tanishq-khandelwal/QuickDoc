export interface Doctor {
    user: {
      name: string;
      email: string;
      phone_number: string;
    };
    experience_years: number;
    specialization: string;
    slot_duration: number;
    consultation_fee: number;
    city: string;
    clinic_address: string;
  }

export interface ProfileComponentProps {
  formData: Doctor | null;
  loading: boolean;
  isEdited: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
}