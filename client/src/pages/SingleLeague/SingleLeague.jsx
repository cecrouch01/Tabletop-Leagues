import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import './SingleLeague.css';
import AuthService from '../../utils/auth'; 

const league = { 
  id: "Jdemasse", 
  name: "Joseph DeMasse", 
  game: "Yugioh",
  organizer: {
    name: "Caleb Crouch",
    contactDetails: "ThisIsMyEmail@gmail.com",
    records: {
      id: "some_player_id",
      wins: 10,
      losses: 5, 
    },
    members: {
      id: "some_member_id", // Replace with actual member ID
      name: "Member Name" // Replace with actual member name
    }
  }
}

const SingleLeague = () => {
  const { leagueId } = useParams();
  const { loading, error, data } = useQuery(GET_LEAGUE_DETAILS, {
    variables: { leagueId },
  });
  const [joinLeague, { data: joinData, loading: joinLoading, error: joinError }] = useMutation(JOIN_LEAGUE);
  
  // Using AuthService to get the user profile and check if the user is logged in
  const user = AuthService.getProfile(); // Get the user profile
  const isLoggedIn = AuthService.loggedIn(); // Check if the user is logged in

  // Function to handle joining a league
  const handleJoinLeague = async () => {
    try {
      await joinLeague({ variables: { leagueId } });
      // Refetch league details or update the cache here as necessary
    } catch (error) {
      console.error('Error joining league:', error);
    }
  };

  if (loading) return <div>Loading League Details...</div>;
  if (error) return <div>An Error Occurred: {error.message}</div>;

  const league = data?.league; // Using optional chaining in case data is undefined

  return (
    <div className="single-league-container">
      <h1 className="league-name">{league?.name}</h1>
      <h2 className="league-game">{league?.game}</h2>
      <div className="league-details">
        <p><strong>Organizer:</strong> {league?.organizer.name}</p>
        <p><strong>Contact:</strong> {league?.organizer.contactDetails}</p>
        <p><strong>Number of Players:</strong> {league?.numberOfPlayers}</p>
        <p><strong>Start Date:</strong> {new Date(league?.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(league?.endDate).toLocaleDateString()}</p>
      </div>

      {isLoggedIn && (
        <button onClick={handleJoinLeague} disabled={joinLoading}>
          {joinLoading ? 'Joining...' : 'Join League'}
        </button>
      )}
      {joinError && <p className="error">Error joining league: {joinError.message}</p>}
      {joinData && joinData.joinLeague.success && <p className="success">{joinData.joinLeague.message}</p>}
    </div>
  );
};

export default SingleLeague;

