import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useState, useEffect} from "react";
import { QUERY_LEAGUES, QUERY_LEAGUE_BY_NAME} from "../../utils/queries";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import { AiOutlineSearch } from 'react-icons/ai';
import './JoinLeagues.css'


const JoinLeagues = () => {
    //State
    const [search, setSearch] = useState('');
    //searchCheck will be used to see if there is a value
    const [searchCheck, setSearchCheck] = useState(false)

    const { loading: allLeaguesLoading, data: allLeaguesData } = useQuery(QUERY_LEAGUES)
    const allLeagues = allLeaguesData?.allLeagues || {}

    const [getLeague, { loading: leagueByNameLoading, data: leagueByNameData, error}] = useLazyQuery(QUERY_LEAGUE_BY_NAME);
    const leagueByName = leagueByNameData?.getLeagueByName || {}

    return (
    <div className="join-league-container">
        <form className="search-form" onSubmit={(event) => {
            event.preventDefault();
            getLeague({ variables:  {"name": search} });
            setSearchCheck(true)
        }}>
            <input
                placeholder="Search"
                className="search-bar" 
                onChange={(event) => {
                    event.preventDefault();
                    setSearch(event.target.value)
                }}
            />
            <button type='submit' className="search-btn"><AiOutlineSearch className="search-icon"/></button>
        </form>
        {searchCheck === false && leagueByNameLoading !== true ? 
            null :
            <div className="search-result">
                <LeagueCard 
                description={leagueByName[0]?.description || "no league found"}
                name={leagueByName[0]?.name || "no league found"}
                creator={leagueByName[0]?.admin.username || "no league found"}
                totalPlayers={leagueByName[0]?.members.length || "no league found"}
                >
                    <button className="join-btn">Join</button>
                </LeagueCard>
            </div>}
        <div className="view-league">
            <div className="left-column">
            {allLeaguesLoading ? <p>loading</p> : allLeagues.map((league , index) => {
                if(index % 2 === 0) {
                    return (
                         <LeagueCard 
                        key={index} 
                        description={league.description}
                        name={league.name}
                        creator={league.admin.username}
                        totalPlayers={league.members.length}
                        >
                            <button className="join-btn">Join</button>
                        </LeagueCard>
                    )
                }
            })}
            </div>
            <div className="right-column">
                {allLeaguesLoading ? <p>loading</p> : allLeagues.map((league, index) => {
                    if(index % 2 !== 0) {
                        return (
                            <LeagueCard 
                            key={index} 
                            description={league.description}
                            name={league.name}
                            creator={league.admin.username}
                            totalPlayers={league.members.length}
                            >
                                <button className="join-btn">Join</button>
                            </LeagueCard>
                        )
                    }
                })}
            </div>
        </div>
    </div>
    )
}

export default JoinLeagues