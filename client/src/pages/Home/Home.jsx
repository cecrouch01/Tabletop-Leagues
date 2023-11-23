import { useQuery} from "@apollo/client";
import { useState } from "react";

import { useColosseumContext } from "../../utils/ColosseumContext";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import { QUERY_HOMEPAGE } from "../../utils/queries";
import './Home.css';

const Home = () => {
    // const [users, setUsers] = useState([])
    // const [leagues, setLeagues] = useState([])
    // const { loading, data } = useQuery(QUERY_HOMEPAGE);
    // const allUsers = data?.allUsers || {};
    // const allLeagues = data?.allLeagues || {}
    
    const [state] = useColosseumContext();
    console.log(state)



    return (
        <div className="home-body">
            <div>
                <h2 className="column-title">Skilled Users</h2>
                {state.allUsers ? state.allUsers.map((user, index) => {
                    return (
                        <UserCard
                            key={index}
                            username={user.username}
                            wins={user.wins}
                            icon={user.icon}
                            description={user.description}
                        />
                    )
                }) :
                <p>Loading</p>
                }
            </div>
            <div>
                <h2 className="column-title">Top Leagues</h2>
                {state.allLeagues ? state.allLeagues.map((league, index) => {
                    return (
                    <LeagueCard 
                        key={index} 
                        description={league.description}
                        name={league.name}
                        creator={league.admin._id}
                        totalPlayers={league.memberCount}
                        id={league._id}
                    />
                    )
                }) 
                : 
                <p>Loading</p>}
            </div>
        </div>
    )
};

export default Home