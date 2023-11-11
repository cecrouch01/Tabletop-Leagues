import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../../utils/auth';
import './SingleLeague.css';

const SingleLeague = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isError, setIsError] = useState(false);

  /* Test Data - Uncomment for development/testing */
  /*
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
        id: "some_member_id",
        name: "Member Name"
      }
    }
  };
  */

  // Assuming you have these queries and mutations set up in your Apollo client
  const { loading, error, data } = useQuery(GET_LEAGUE_DETAILS, {
    variables: { leagueId },
  });

  const [joinLeague, { data: joinData, loading: joinLoading, error: joinError }] = useMutation(JOIN_LEAGUE);

  useEffect(() => {
    if (data) {
      setLeagueDetails(data.league);
    } else if (error) {
      setIsError(true);
    }
  }, [data, error]);

  const handleJoinLeague = async () => {
    try {
      await joinLeague({ variables: { leagueId } });
      // Refetch league details or update cache
    } catch (error) {
      console.error('Error joining league:', error);
    }
  };

  const isLoggedIn = AuthService.loggedIn();
  const isAdmin = AuthService.isAdmin();

  if (loading) return <div>Loading League Details...</div>;
  if (isError) return <div>An Error Occurred: {error?.message}</div>;

  return (
    <div className="single-league-container">
      <h1 className="league-name">{leagueDetails?.name}</h1>
      <h2 className="league-game">{leagueDetails?.game}</h2>
      <div className="league-details">
        {/* League details here */}
      </div>

      {isLoggedIn && !isAdmin && (
        <button onClick={handleJoinLeague} disabled={joinLoading}>
          {joinLoading ? 'Joining...' : 'Join League'}
        </button>
      )}

      {isAdmin && (
        <div>
          <p>Admin Panel: View and Set User Stats</p>
          {/* Admin-specific components or functionality */}
        </div>
      )}

      {!isAdmin && (
        <div>
          <p>User Stats: View Your Stats</p>
          {/* User-specific components or functionality */}
        </div>
      )}

      {joinError && <p className="error">Error joining league: {joinError.message}</p>}
      {joinData && joinData.joinLeague.success && <p className="success">{joinData.joinLeague.message}</p>}
    </div>
  );
};

export default SingleLeague;
