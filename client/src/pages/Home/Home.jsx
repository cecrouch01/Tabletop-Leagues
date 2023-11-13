import { useQuery } from "@apollo/client";


import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import {  QUERY_USERS, QUERY_ME, QUERY_HOMEPAGE } from "../../utils/queries";
import './Home.css';

const Home = () => {
    const highScores = [1, 2, 3, 4, 5]
    const topLeagues = [1, 2, 3, 4, 5]

    const { loading, data } = useQuery(QUERY_HOMEPAGE);
    const allUsers = data?.allUsers || {};
    const allLeagues = data?.allLeagues || {}
   
    return (
        <div className="home-body">
            <div>
                <h2 className="column-title">Skilled Users</h2>
                {loading ? <p>Loading</p> : allUsers.map((user, index) => {
                    return (
                        <UserCard 
                        key={index} 
                        username={user.username}
                        wins={user.wins}
                        icon={user.icon}
                        description={user.description}
                        /> 
                    )
                })}
            </div>
            <div>
                <h2 className="column-title">Top Leagues</h2>
                {loading ? <p>Loading</p> : allLeagues.map((league, index) => {
                    return (
                    <LeagueCard key={index} 
                        description={league.description}
                        name={league.name}
                        creator={league.admin.username}
                        totalPlayers={league.members.length}
                    />
                    )
                })}
            </div>
        </div>
    )
};

export default Home