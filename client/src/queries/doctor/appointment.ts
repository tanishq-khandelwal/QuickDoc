import { gql } from "@apollo/client";

export const GET_ALL_APPOINTMENTS = gql`
  query GET_ALL_APPOINTMNETS($doctorId: Int!) {
    appointments(
      where: { doctor_id: { _eq: $doctorId } }
      order_by: { appointment_date: asc }
    ) {
      appointment_id
      created_at
      appointment_date
      patient_id
      start_time
      end_time
      status
      user {
        name
        email
        phone_number
      }
    }
  }
`;
