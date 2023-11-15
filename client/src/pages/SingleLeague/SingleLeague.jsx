// import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApolloContext, useQuery } from '@apollo/client';
// import AuthService from '../../utils/auth';
import AdminForm from '../../components/AdminForm/AdminForm';
import './SingleLeague.css';
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import Card from '../../components/Card/Card';
import { QUERY_SINGLE_LEAGUE } from '../../utils/queries';

const SingleLeague = () => {
  // const { leagueId } = useParams();
  // const [leagueDetails, setLeagueDetails] = useState(null);
  // const [isError, setIsError] = useState(false);
  // const [userRecords, setUserRecords] = useState([]);

  // const { loading, error, data } = useQuery(GET_LEAGUE_DETAILS, {
  //   variables: { leagueId },
  // });

  // const [updateUserRecord, { loading: updatingRecord, error: updateError }] = useMutation(UPDATE_USER_RECORD);

  // useEffect(() => {
  //   if (data) {
  //     setLeagueDetails(data.league);
  //     setUserRecords(data.league.users); // Assuming 'users' contains user records
  //   } else if (error) {
  //     setIsError(true);
  //   }
  // }, [data, error]);

  // const handleUpdateUserRecord = async (userId, event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const wins = parseInt(formData.get('wins'), 10);
  //   const losses = parseInt(formData.get('losses'), 10);
  //   const points = parseInt(formData.get('points'), 10);

  //   try {
  //     await updateUserRecord({ variables: { userId, wins, losses, points } });
  //   } catch (error) {
  //     console.error('Error updating user record:', error);
  //   }
  // };

  // const isAdmin = AuthService.isAdmin();

  // if (loading) return <div>Loading League Details...</div>;
  // if (isError) return <div>An Error Occurred: {error?.message}</div>;
  const { id } = useParams();
  
  const { loading, data: getLeague } = useQuery(QUERY_SINGLE_LEAGUE, { variables: { id } });
  if (loading) return <p>Loading</p>
  const league = getLeague?.getLeague || {};

  return (

    <div className="league-container">
      <h2 className='league-header'>{league.name}</h2>
      <div className='league-card'>
        <LeagueCard
          description={league.description}
          name={league.name}
          creator={league.admin?.username}
          totalPlayers={league.members?.length} />
      </div>
      <AdminForm members={league.members} />
    </div>

    // <div className="single-league-container">
    //   <h1 className="league-name">{leagueDetails?.name}</h1>
    //   <h2 className="league-game">{leagueDetails?.game}</h2>
    //   <div className="league-details">
    //     <p><strong>Organizer:</strong> {leagueDetails?.organizer.name}</p>
    //     <p><strong>Contact:</strong> {leagueDetails?.organizer.contactDetails}</p>
    //     <p><strong>Number of Players:</strong> {leagueDetails?.numberOfPlayers}</p>
    //   </div>

    //   {isAdmin && (
    //     <div>
    //       <h3>Admin Panel: Update User Records</h3>
    //       {userRecords.map(user => (
    //         <form onSubmit={(e) => handleUpdateUserRecord(user.id, e)} key={user.id}>
    //           <p>{user.name}</p>
    //           <input type="number" name="wins" placeholder="Wins" defaultValue={user.wins} />
    //           <input type="number" name="losses" placeholder="Losses" defaultValue={user.losses} />
    //           <input type="number" name="points" placeholder="Points" defaultValue={user.points} />
    //           <button type="submit" disabled={updatingRecord}>Update Record</button>
    //         </form>
    //       ))}
    //     </div>
    //   )}

    //   {updateError && <p className="error">Error updating record: {updateError.message}</p>}
    // </div>
  );
};

export default SingleLeague;
