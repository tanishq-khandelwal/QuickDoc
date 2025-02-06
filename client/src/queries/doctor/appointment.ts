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

export const UPDATE_APPOINTMENT_STATUS = gql`
  mutation UPDATE_APPOINTMENT_STATUS($appointmentId:Int,$status:String) {
    update_appointments(
      where: { appointment_id: { _eq: $appointmentId } }
      _set: { status: $status }
    ) {
      returning {
        appointment_id  
      }
    }
  }
`;
