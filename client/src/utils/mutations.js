<<<<<<< HEAD
import { gql } from '@apollo/client';

// GraphQL mutation for joining a league
export const JOIN_LEAGUE = gql`
  mutation JoinLeague($leagueId: ID!) {
    joinLeague(leagueId: $leagueId) {
      success
      message
      league {
        id
        members {
          id
          name
        }
      }
    }
  }
`;
=======
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

<<<<<<< HEAD
export const UPDATE_USER = gql`
  mutation UpdateUser($id: String, $username: String, $email: String, $password: String, $description: $String, $icon: String) {
    updateUser(id: $id, username: $username, email: $email, password: $password, description: $description, icon: $icon) {
      token
      user {
        id
        username
        email
        password
        description
        icon
      }
    }
  }
`;

export const ADD_LEAGUE = gql`
  mutation AddLeague($name: String, $description: String, $admin: String, $active: Boolean, $password: String) {
    addLeague(name: $name, description: $description, admin: $admin, active: $active, password: $password) {
      addLeague(name: $name, description: $description, admin: $admin, active: $active, password: $password)
    } {
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

=======
>>>>>>> 7241674d526bd899a61c7889bce729ac5a035bcf
>>>>>>> 64e3a2108950fa5dc1a88be7b5026811905f12f7
