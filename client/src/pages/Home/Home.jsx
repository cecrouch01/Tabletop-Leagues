import { useQuery } from "@apollo/client";


import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import {  QUERY_USERS, QUERY_ME } from "../../utils/queries";
import './Home.css';

const Home = () => {
    const highScores = [1, 2, 3, 4, 5]
    const topLeagues = [1, 2, 3, 4, 5]

    const { loading, data } = useQuery(QUERY_USERS);
    const allUsers = data?.allUsers || {};

    return (
        <div className="home-body">
            <div>
                <h2 className="column-title">Skilled Users</h2>
                {loading ? <p>Loading</p> : allUsers.map((user, index) => {
                    return <UserCard 
                        key={index} 
                        username={user.username}
                        wins={user.wins}
                        icon={user.icon}
                        description={user.description}
                    /> 
                })}
            </div>
            <div>
                <h2 className="column-title">Top Leagues</h2>
                {topLeagues.map((league, index) => {
                    return <LeagueCard key={index} />
                })}
            </div>
        </div>
    )
};

export default Home