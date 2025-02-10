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
