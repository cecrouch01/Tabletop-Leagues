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
          creator={league.admin._id}
          totalPlayers={league.members?.length} />
      </div>
      <AdminForm members={league.members} />
    </div>
  );
};

export default SingleLeague;
