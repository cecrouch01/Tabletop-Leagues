import { useQuery} from "@apollo/client";
import { useState } from "react";

import { useColosseumContext } from "../../utils/ColosseumContext";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import { QUERY_HOMEPAGE } from "../../utils/queries";
import './Home.css';

const Home = () => {
    const [state] = useColosseumContext();

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