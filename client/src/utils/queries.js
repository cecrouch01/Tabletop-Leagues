import {gql} from '@apollo/client'

//TODO Get all users
export const QUERY_USERS = gql`
    query getAllUsers {
        allUsers {
        username
        description
        email
        icon
        wins
        }
    }
`; 
//TODO Get Me
export const QUERY_ME = gql`
    query getMe {
        me {
            _id
            username
            wins
            description
            icon
            leagues
        }
    }
`;
//TODO Get all Leagues
