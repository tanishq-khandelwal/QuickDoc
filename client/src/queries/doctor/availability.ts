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

// Assuming you're fetching doctorId from localStorage
const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;

// console.log(doctorId); // This will log the doctorId from localStorage or null if not found
