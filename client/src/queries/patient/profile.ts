import { gql } from "@apollo/client";

export const MyProfile = gql`
  query Myprofile($id: Int!) {
    users(where: { user_id: { _eq: $id } }) {
      name
      email
      phone_number
    }
  }
`;

export const UpdateProfile = gql`
  mutation EDIT_PATIENT_PROFILE(
    $id: Int!
    $email: String
    $name: String
    $phone: String
  ) {
    update_users(
      where: { user_id: { _eq: $id } }
      _set: { email: $email, name: $name, phone_number: $phone }
    ) {
      returning {
        user_id
      }
    }
  }
`;
