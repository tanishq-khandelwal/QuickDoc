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
