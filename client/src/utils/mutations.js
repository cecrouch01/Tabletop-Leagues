import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
mutation AddUser($email: String!, $password: String!, $description: String, $icon: String, $username: String!) {
    addUser(email: $email, password: $password, description: $description, icon: $icon, username: $username) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

