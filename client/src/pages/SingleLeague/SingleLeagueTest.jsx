import React from 'react';
// import { useParams } from 'react-router-dom'; // Uncomment if useParams is needed
// import { useQuery, useMutation } from '@apollo/client'; // Uncomment for actual data fetching
import './SingleLeague.css';
// import AuthService from '../../utils/auth'; // Uncomment if AuthService is needed

const SingleLeague = () => {
  console.log('Test')
  // Uncomment the below lines if you are fetching data from an API
  // const { leagueId } = useParams();
  // const { loading, error, data } = useQuery(GET_LEAGUE_DETAILS, {
  //   variables: { leagueId },
  // });
  // const [joinLeague, { data: joinData, loading: joinLoading, error: joinError }] = useMutation(JOIN_LEAGUE);

  // Test data for development
  // const league = {
  //   id: "Jdemasse",
  //   name: "Joseph DeMasse",
  //   game: "Yugioh",
  //   organizer: {
  //     name: "Caleb Crouch",
  //     contactDetails: "ThisIsMyEmail@gmail.com",
  //     records: {
  //       id: "some_player_id",
  //       wins: 10,
  //       losses: 5,
  //     },
  //     members: {
  //       id: "some_member_id",
  //       name: "Member Name"
  //     }
  //   }
  // };

  // Uncomment if using AuthService to check user login
  // const user = AuthService.getProfile();
  // const isLoggedIn = AuthService.loggedIn();

  // Uncomment to add functionality for joining a league
  // const handleJoinLeague = async () => {
  //   try {
  //     await joinLeague({ variables: { leagueId } });
  //   } catch (error) {
  //     console.error('Error joining league:', error);
  //   }
  // };

  // Uncomment for handling loading and error states
  // if (loading) return <div>Loading League Details...</div>;
  // if (error) return <div>An Error Occurred: {error.message}</div>;

  return (
    <h1>Single League Test Page</h1>
    // <div className="single-league-container">
    //   <h1 className="league-name">{league.name}</h1>
    //   <h2 className="league-game">{league.game}</h2>
    //   <div className="league-details">
    //     <p><strong>Organizer:</strong> {league.organizer.name}</p>
    //     <p><strong>Contact:</strong> {league.organizer.contactDetails}</p>
    //     <p><strong>Number of Players:</strong> {/* Insert the number of players here */}</p>
    //   </div>



  );
};

export default SingleLeague;
