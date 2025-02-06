import { gql } from "@apollo/client";

export const SIGNUP_DOCTOR = gql`
 mutation SIGNUP_DOCTOR(
  $userId: Int!
  $specialization: String!
  $experience_years: Int!
  $clinic_address: String!
  $city: String
  $consultation_fee: numeric
  $slot_duration: numeric = "15"
  $availabilities: [doctor_availability_insert_input!]! = [
    { available_days: "Monday", start_time: "09:00", end_time: "17:00" },
    { available_days: "Tuesday", start_time: "09:00", end_time: "17:00" },
    { available_days: "Wednesday", start_time: "09:00", end_time: "17:00" },
    { available_days: "Thursday", start_time: "09:00", end_time: "17:00" },
    { available_days: "Friday", start_time: "09:00", end_time: "17:00" }
  ]
) {
  insert_doctors(
    objects: {
      user_id: $userId
      specialization: $specialization
      experience_years: $experience_years
      clinic_address: $clinic_address
      city: $city
      consultation_fee: $consultation_fee
      slot_duration: $slot_duration
      doctor_availabilities: {
        data: $availabilities
      }
    }
  ) {
    returning {
      doctor_id
    }
  }
}

`;
