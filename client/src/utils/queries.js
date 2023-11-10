import { gql } from '@apollo/client';


// GraphQL query for fetching a single league's details
export const GET_LEAGUE_DETAILS = gql`
  query GetLeagueDetails($leagueId: ID!) {
    league(id: $leagueId) {
      id
      name
      game
      organizer {
        name
        contactDetails
      }
      numberOfPlayers
      startDate
      endDate
      records {
        playerId
        wins 
        losses
      }
      members {
        id
        name
      }
    }
  }
  `;