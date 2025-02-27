import { gql } from "@apollo/client/core";

export const CHECK_USER = gql`
  query check_user($email:String!) {
    users(where: { email: { _eq: $email } }) {
      email,
      password,
      user_id,
      role,
      name,
      doctors {
        doctor_id
      }
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


export const GET_APPOINTMENTS_DETAILS=gql`
query get_patient_doctor ($id:Int!){
  appointments(where: {appointment_id: {_eq:$id }}) {
    doctor {
      user {
        name
        email
      }
    }
    user {
      name
      email
    }
    appointment_date
    start_time
    end_time
  }
}

`