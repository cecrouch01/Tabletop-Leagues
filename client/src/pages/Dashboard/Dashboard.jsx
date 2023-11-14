import { useQuery } from '@apollo/client';

import { QUERY_ME, QUERY_LEAGUES } from '../../utils/queries';
import Card from '../../components/Card/Card'
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import UserCard from '../../components/UserCard/UserCard';
import './Dashboard.css'
const Dashboard = () => {
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const { username, icon, description, wins, leagues } = meData?.getMe || {}

    const { loading: leaguesLoading, data: leaguesData } = useQuery(QUERY_LEAGUES)
    const allLeagues = leaguesData?.allLeagues || {}
    
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
                    {leaguesLoading ? <p>loading</p> : allLeagues.map((league, index) => {
                        if(league.active === false) {
                        return <LeagueCard 
                            key={index} 
                            description={league.description}
                            name={league.name}
                            creator={league.admin.username}
                            totalPlayers={league.memberCount}
                        />
                        }
                    })}
                </section>
                <section className='active-leagues'>
                    <h2 className='column-title'>Active Leagues</h2>
                    {leaguesLoading ? <p>loading</p> : allLeagues.map((league, index) => {
                        if(league.active === true) {
                        return <LeagueCard 
                            key={index}
                            description={league.description}
                            name={league.name}
                            creator={league.admin.username}
                            totalPlayers={league.memberCount} 
                        />
                        }
                    })}
                </section>
            </div>
        </div>
    )
}

export default Dashboard