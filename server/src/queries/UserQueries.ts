import { gql } from "@apollo/client/core";

export const CHECK_USER = gql`
  query check_user($email:String!) {
    users(where: { email: { _eq: $email } }) {
      user_id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CREATE_USER($user: [users_insert_input!]!) {
    insert_users(objects: $user) {
      returning {
        user_id
      }
    }
  }
`;
