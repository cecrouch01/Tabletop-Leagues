import {gql} from '@apollo/client'

//Get all users
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
//Get Me
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
// Get all Leagues
export const QUERY_LEAGUES = gql`
    query allLeagues {
        allLeagues {
            name
            description
            admin
            members
            games
            active
        }
    }
`;
//Get specific League
export const QUERY_LEAGUE = gql`
    query getLeague {
        league {
            name
            description
            admin
            members
            games
            active
        }
    }
`;