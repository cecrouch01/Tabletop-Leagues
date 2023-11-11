import {gql} from '@apollo/client'

//TODO Get all users
const QUERY_USERS = gql`
    query GetAllUsers {
        allUsers {
        description
        email
        icon
        wins
        }
    }
`; 
//TODO Get Me
const QUERY_ME = gql`

`;
//TODO Get all Leagues




export { QUERY_USERS, QUERY_ME}