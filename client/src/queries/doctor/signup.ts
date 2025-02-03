import { gql } from "@apollo/client";

export const SIGNUP_DOCTOR = gql`
  mutation signup {
    insert_doctors(
      objects: {
        user_id: 10
        experience_years: 10
        specialization: ""
        slot_duration: ""
        city: ""
        clinic_address: ""
        consultation_fee: ""
      }
    )
    returning {
      doctor_id
    }
  }
`;
