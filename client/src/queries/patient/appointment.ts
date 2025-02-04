import { gql } from "@apollo/client";

export const BOOK_APPOINTMENT = gql`
  mutation BOOK_APPOINTMENT(
    $doctorId: Int!
    $appointmentDate: date
    $patientId: Int!
    $startTime: time
    $endTime: time
  ) {
    insert_appointments(
      objects: {
        doctor_id: $doctorId
        appointment_date: $appointmentDate
        patient_id: $patientId
        start_time: $startTime
        end_time: $endTime
      }
    ) {
      returning {
        appointment_id
      }
    }
  }
`;


export const GET_APPOINTMENTS = gql`
query GET_APPOINTMENTS {
  appointments(where: {patient_id: {_eq: 8}}) {
    appointment_date
    start_time
    end_time
    status
    doctor {
      user {
        name
        email
        phone_number
      }
    }
  }
}
`;