import { useState } from "react";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import { AiOutlineSearch } from 'react-icons/ai';
import './JoinLeagues.css'


const JoinLeagues = () => {
    const [search, setSearch] = useState('');
    const arr = [1,2,3,4]
    
    return (
    <div className="join-league-container">
        <form className="search-form" onSubmit={(event) => {
            event.preventDefault();
        }}>
            <input
                placeholder="Search"
                className="search-bar" 
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
            />
            <button type='submit' className="search-btn"><AiOutlineSearch className="search-icon"/></button>
        </form>
        <div className="view-league">
            <div className="left-column">
            {arr.map((league , index) => {
                if(index % 2 === 0) {
                    return (
                        <LeagueCard key={index}>
                            <button className="join-btn">Join</button>
                        </LeagueCard>
                    )
                }
            })}
            </div>
            <div className="right-column">
                {arr.map((league, index) => {
                    if(index % 2 !== 0) {
                        return (
                            <LeagueCard key={index}>
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