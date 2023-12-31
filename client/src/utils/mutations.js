
import { gql } from '@apollo/client';


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

// export const UPDATE_USER = gql`
//   mutation UpdateUser($id: String, $username: String, $email: String, $password: String, $description: $String, $icon: String) {
//     updateUser(id: $id, username: $username, email: $email, password: $password, description: $description, icon: $icon) {
//       token
//       user {
//         id
//         username
//         email
//         password
//         description
//         icon
//       }
//     }
//   }
// `;

export const ADD_LEAGUE = gql`
  mutation addLeague($name: String!, $description: String!, $password: String!) {
    addLeague(name: $name, description: $description, password: $password) {
      name
      description
      password
    }
  }
`;

export const ADD_MEMBER = gql`
mutation AddMember($leagueId: ID!) {
    addMember(leagueId: $leagueId) {
      name
      description
    }
  }
`;

export const DEACTIVATE_LEAGUE = gql`
  mutation DeactivateLeague($leagueId: ID!, $active: boolean) {
    deactivateLeague(leagueId: $leagueId, active: $active) {
      league {
        name
        description
        admin
        active
        password
      }
    }
  }
`;
