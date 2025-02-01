import { gql } from "@apollo/client";


// const doctorId=localStorage.getItem()
export const FETCH_AVAILABILITY = gql`
  query get_doctor_availability {
    doctor_availability(where: { doctor_id: { _eq: 1 } }) {
      available_days
      start_time
      end_time
    }
  }
`;
