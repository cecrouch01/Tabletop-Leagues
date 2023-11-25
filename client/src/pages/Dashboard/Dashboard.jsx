import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useColosseumContext } from '../../utils/ColosseumContext';
import { QUERY_ME, QUERY_LEAGUES } from '../../utils/queries';
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import UserCard from '../../components/UserCard/UserCard';
import './Dashboard.css'
const Dashboard = () => {
    const [me, setMe] = useState({});
    const [state] = useColosseumContext(); 

    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const myInfo = meData?.getMe || {}
    useEffect(() => {
         setMe(myInfo)
    },[myInfo])
   
    const { username, icon, description, wins, leagues } = me
   
    
    return (
        <div className='dshbrd-container'>
            <div className='dshbrd-user-card'>
                <UserCard
                    username={username}
                    icon={icon}
                    description={description}
                    wins={wins}
                />
            </div>
            <div className='dshbrd-contents'>
                <section className='user-record'>
                    {/* I think we can use useReducer to change the card formats instead of using different cards */}
                    <h2 className='column-title'>Past Leagues</h2>
                    {state.allLeagues ?  state.allLeagues.map((league, index) => {
                        if(league.active === false) {
                        return <LeagueCard 
                            key={index} 
                            description={league.description}
                            name={league.name}
                            creator={league.admin._id}
                            totalPlayers={league.memberCount}
                            id={league._id}
                        />
                        }
                    }) : <p>loading</p>}
                </section>
                <section className='active-leagues'>
                    <h2 className='column-title'>Active Leagues</h2>
                    {state.allLeagues ? state.allLeagues.map((league, index) => {
                        if(league.active === true) {
                        return <LeagueCard 
                            key={index}
                            description={league.description}
                            name={league.name}
                            creator={league.admin._id}
                            totalPlayers={league.memberCount}
                            id={league._id}
                        />
                        }
                    }): <p>loading</p>}
                </section>
            </div>
        </div>
    )
}

export default Dashboard