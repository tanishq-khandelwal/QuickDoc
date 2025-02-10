import { gql } from "@apollo/client";

export const GET_DOCTOR_PROFILE = gql`
  query DoctorProfile($doctorId:Int!) {
    doctors(where: { doctor_id: { _eq: $doctorId } }) {
      user {
        name
        email
        phone_number
      }
      experience_years
      specialization
      slot_duration
      consultation_fee
      clinic_address
      city
    }
  }
`;
