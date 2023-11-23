import { gql } from '@apollo/client'

//Get all users
export const QUERY_USERS = gql`
    query getAllUsers {
        allUsers {
            _id
            email
            username
            password
            icon
            description
            wins
            leagueCount
          }
        }
`;

export const QUERY_SINGLE_USER = gql`
  query GetUser($id: [ID!]!) {
    getUser(_id: $id) {
      _id
      username
      icon
      description
      wins
    }
  }
`;
//Get Me
export const QUERY_ME = gql`
query GetMe {
    getMe {
      _id
        email
        username
        password
        icon
        description
        wins
        leagueCount
        leagues {
          league {
            _id
          }
        }
        activeLeagues {
          _id
        }
        inactiveLeagues {
          _id
        }
    }
  }
`;
export const QUERY_HOMEPAGE = gql`
query HompageQuery {
  allUsers {
    _id
    username
    icon
    description
    wins
    leagueCount
  }
  allLeagues {
    _id
    name
    description
    active
    gameCount
    memberCount
    admin {
      _id
    }
  }
}
`;
// Get all Leagues
export const QUERY_LEAGUES = gql`
query AllLeagues {
    allLeagues {
      _id
      active
      name
      description
      password
      memberCount
      gameCount
      admin {
        _id
      }
      winner {
        _id
      }
    }
  }
`;
//Get specific League
export const QUERY_SINGLE_LEAGUE = gql`
query GetLeague($id: ID!) {
    getLeague( _id: $id ) {
      _id
      active
      name
      description
      password
      admin {
        _id
      }
      winner {
        username
      }
      memberCount
      members {
        user {
          _id
          username
        }
        points
      }
      games {
        game {
          place
          user {
            username
            _id
          }
        }
      }
    }
  }
`;

export const QUERY_LEAGUE_BY_NAME = gql`
query GetLeagueByName($name: String!) {
    getLeagueByName(name: $name) {
      _id
      active
      name
      description
      password
      admin {
        _id
      }
      winner {
        _id
      }
      memberCount
      gameCount
      members {
        points
        user {
          _id
        }
      }
      games {
        game {
          place
          user {
            _id
          }
        }
      }
    }
  }
`;