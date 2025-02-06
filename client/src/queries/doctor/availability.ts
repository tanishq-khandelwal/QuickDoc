import { gql } from "@apollo/client";

// GraphQL query with variable
export const FETCH_AVAILABILITY = gql`
  query get_doctor_availability($doctorId: Int!) {
    doctor_availability(where: { doctor_id: { _eq: $doctorId } }) {
      available_days
      start_time
      end_time
      is_available
    }
  }
`;

export const UPDATE_AVAILABILITY = gql`
  mutation UPDATE_AVAILABILITY(
    $doctorId: Int!
    $availableDay:String
    $startTime: time
    $endTime: time
    $available: Boolean
  ) {
    update_doctor_availability(
      where: {
        doctor_id: { _eq: $doctorId }
        available_days: { _eq: $availableDay }
        }
        _set:{
          start_time: { _eq: $startTime }
        end_time: { _eq: $endTime }
        is_available: { _eq: $available }
        }
    ) {
      returning {
        doctor_id
      }
    }
  }
`;

// Assuming you're fetching doctorId from localStorage
const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;

// console.log(doctorId); // This will log the doctorId from localStorage or null if not found
