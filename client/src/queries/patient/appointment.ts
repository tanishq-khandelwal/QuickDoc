import { gql } from "@apollo/client";


export const BOOK_APPOINTMENT = gql`
  mutation BOOK_APPOINTMENT(
    $doctorId: Int!
    $appointmentDate: date
    $patientId: Int!
    $startTime: time
    $endTime: time
    $patientTimeZone:String!
  ) {
    insert_appointments(
      objects: {
        doctor_id: $doctorId
        appointment_date: $appointmentDate
        patient_id: $patientId
        start_time: $startTime
        end_time: $endTime
        patient_time_zone:$patientTimeZone
      }
    ) {
      returning {
        appointment_id
      }
    }
  }
`;


export const GET_APPOINTMENTS = gql`
query GET_APPOINTMENTS ($userId: Int!) {  
  appointments(where: {patient_id: {_eq:$userId }}, order_by: {appointment_date: asc}) {
    appointment_id
    appointment_date
    start_time
    end_time
    patient_time_zone
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