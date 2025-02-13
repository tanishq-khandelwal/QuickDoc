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
    $availableDay: String
    $startTime: time
    $endTime: time
    $available: Boolean
  ) {
    update_doctor_availability(
      where: {
        doctor_id: { _eq: $doctorId }
        available_days: { _eq: $availableDay }
      }
      _set: {
        start_time: $startTime
        end_time: $endTime
        is_available: $available
      }
    ) {
      returning {
        doctor_id
      }
    }
  }
`;

export const UPDATE_EXCEPTION_AVAILABILITY = gql`
  mutation INSERT_EXCEPTION(
    $doctorId: Int!
    $startTime: time
    $endTime: time
    $available: Boolean
    $date: date
  ) {
    insert_exception_availability(
      objects: {
        doctor_id: $doctorId
        start_time: $startTime
        end_time: $endTime
        is_available: $available
        special_date: $date
      }
    ) {
      returning {
        availability_id
      }
    }
  }
`;

export const GET_EXCEPTION_AVAILABILITY = gql`
  query GET_EXCEPTION_AVAILABILITY {
    exception_availability(where: { doctor_id: { _eq: 1 } }) {
      availability_id
      special_date
      start_time
      end_time
      is_available
    }
  }
`;

// Assuming you're fetching doctorId from localStorage
const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;

console.log(doctorId); // This will log the doctorId from localStorage or null if not found
