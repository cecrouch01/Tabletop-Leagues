import { useQuery } from "@apollo/client";


import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import { QUERY_USERS, QUERY_ME } from "../../utils/queries";
import './Home.css';

const Home = () => {
    const highScores = [1, 2, 3, 4, 5]
    const topLeagues = [1, 2, 3, 4, 5]

    
    // const { loading, data } = useQuery(QUERY_USERS);
    const { loading, data } = useQuery(QUERY_ME);

    const userData = data?.me || {};

    // const userList = data?.user || {};

    console.log(userData);
    // console.log(userList);

    return (
        <div className="home-body">
            <div>
                <h2 className="column-title">Skilled Users</h2>
                {highScores.map((user, index) => {
                    return <UserCard key={index} />
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