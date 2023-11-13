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
    query GetMe {
        getMe {
        description
        icon
        username
        wins
        leagues {
            active
            description
            name
            admin {
            username
            }
            games {
            game {
                place
                player {
                username
                }
            }
            }
        }
        }
    }
`;
export const QUERY_HOMEPAGE = gql`
query HompageQuery {
    allUsers {
      username
      description
      icon
      wins
    }
    allLeagues {
      active
      admin {
        username
      }
      description
      name
      members {
        user {
          username
        }
      }
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
export const QUERY_SINGLE_LEAGUE = gql`
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
