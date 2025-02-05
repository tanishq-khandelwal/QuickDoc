import { gql } from "@apollo/client";

// GraphQL query with variable
export const FETCH_AVAILABILITY = gql`
  query get_doctor_availability($doctorId: Int!) {
    doctor_availability(where: { doctor_id: { _eq: $doctorId } }) {
      available_days
      start_time
      end_time
    }
  }
`;

export const UPDATE_AVAILABILITY = gql`
  mutation UPDATE_AVAILABILITY($doctorId:Int!,$startTime:date,$endTime:date,$slotTime:INT!) {
    update_doctor_availability(
      where: {
        doctor_id: { _eq: $doctorId }
        start_time: { _eq: $startTime }
        end_time: { _eq: $endTime }
        doctor: { slot_duration: { _eq: $slotTime } }
      }
    )
  }
`;

// Assuming you're fetching doctorId from localStorage
const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;

// console.log(doctorId); // This will log the doctorId from localStorage or null if not found
