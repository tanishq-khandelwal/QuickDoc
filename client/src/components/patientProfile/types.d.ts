export interface PatientProfileProps {
  loading: boolean;
  isEditing: boolean;
  updatedName: string;
  updatedEmail: string;
  updatedPhone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}