import { gql } from "@apollo/client";

export const FETCH_DOCTORS = gql`
  query MyQuery {
    doctors {
      clinic_address
      created_at
      slot_duration
      consultation_fee
      city
      doctor_id
      specialization
      experience_years
      user {
        name
      }
    }
  }
`;

export const FETCH_DOCTOR_AVAILABILITY = gql`
  query doctor_availability($doctorId: Int!) {
    doctors(where: { doctor_id: { _eq: $doctorId } }) {
      slot_duration
      specialization
      experience_years
      consultation_fee
      city
      clinic_address
      doctor_availabilities {
        end_time
        start_time
        available_days
        is_available
      }
      appointments {
        appointment_date
        end_time
        start_time
      }
      user {
        name
      }
    }
  }
`;
