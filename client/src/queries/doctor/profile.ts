import { gql } from "@apollo/client";

export const GET_DOCTOR_PROFILE = gql`
  query DoctorProfile($doctorId: Int!) {
    doctors(where: { doctor_id: { _eq: $doctorId } }) {
      user {
        name
        email
        phone_number
      }
      experience_years
      specialization
      slot_duration
      consultation_fee
      clinic_address
      city
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE ($id:Int!,$city:String,$clinicAddress:String,$fee:numeric,$experience:Int,$slot:numeric,$specialization:String){
    update_doctors(
      where: { doctor_id: { _eq: $id } }
      _set: {
        city: $city
        clinic_address: $clinicAddress
        consultation_fee: $fee
        experience_years: $experience
        slot_duration: $slot
        specialization: $specialization
      }
    ) {
      returning {
        doctor_id
      }
    }
  }
`;
