import { useMutation, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useColosseumContext } from "../../utils/ColosseumContext";
import { QUERY_LEAGUE_BY_NAME } from "../../utils/queries";
import { ADD_MEMBER } from "../../utils/mutations";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import { AiOutlineSearch } from 'react-icons/ai';
import './JoinLeagues.css'


const JoinLeagues = () => {
    const [state] = useColosseumContext();
    const [search, setSearch] = useState('');
    //searchCheck will be used to see if there is a value
    const [searchCheck, setSearchCheck] = useState(false)

    const [getLeague, { loading: leagueByNameLoading, data: leagueByNameData }] = useLazyQuery(QUERY_LEAGUE_BY_NAME);
    const leagueByName = leagueByNameData?.getLeagueByName || {}
    const [addMember, { error }] = useMutation(ADD_MEMBER)

    return (
        <div className="join-league-container">
            <form className="search-form" onSubmit={(event) => {
                event.preventDefault();
                getLeague({ variables: { "name": search } });
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
                <button type='submit' className="search-btn"><AiOutlineSearch className="search-icon" /></button>
            </form>
            {searchCheck === false && leagueByNameLoading !== true ?
                null :
                <div className="search-result">
                    <LeagueCard
                        description={leagueByName[0]?.description || "no league found"}
                        name={leagueByName[0]?.name || "no league found"}
                        creator={leagueByName[0]?.admin.username || "no creator found"}
                        totalPlayers={leagueByName[0]?.memberCount || "no league found"}
                        
                    >
                        <button className="join-btn">Join</button>
                    </LeagueCard>
                </div>}
            <div className="view-league">
                <div className="left-column">
                    {state.allLeagues ?  state.allLeagues.map((league, index) => {
                        if (index % 2 === 0) {
                            return (
                                <LeagueCard
                                    key={index}
                                    description={league.description}
                                    name={league.name}
                                    creator={league.admin._id}
                                    totalPlayers={league.memberCount}
                                    id={league._id}
                                >
                                    <button
                                        onClick={async (event) => {
                                            event.preventDefault();
                                            console.log(league._id)
                                            const { data } = await addMember({
                                                variables: { leagueId: league._id }
                                            })
                                            console.log(data)
                                        }}
                                        className="join-btn"
                                    >Join</button>
                                </LeagueCard>
                            )
                        }
                    }) : <p>loading</p>}
                </div>
                <div className="right-column">
                    {state.allLeagues ? state.allLeagues.map((league, index) => {
                        if (index % 2 !== 0) {
                            return (
                                <LeagueCard
                                    key={index}
                                    description={league.description}
                                    name={league.name}
                                    creator={league.admin.username}
                                    totalPlayers={league.memberCount}
                                    id={league._id}
                                >
                                    <button
                                        onClick={async (event) => {
                                            event.preventDefault();
                                            console.log(league._id)
                                            const { data } = await addMember({
                                                variables: { leagueId: league._id }
                                            })
                                            console.log(data)
                                        }}
                                        className="join-btn"
                                    >Join</button>
                                </LeagueCard>
                            )
                        }
                    }) :  <p>loading</p>}
                </div>
            </div>
        </div>
    )
}

export default JoinLeagues