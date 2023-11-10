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