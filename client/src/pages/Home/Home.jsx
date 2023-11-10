import Card from "../../components/Card/Card";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import './Home.css';
const Home = () => {
    const highScores = [1,2,3,4,5]
    const topLeagues = [1,2,3,4,5]
    return (
    <div className="home-body">
        <div>
            <h3>Skilled Users</h3>
            {highScores.map((user, index) => {
                return <UserCard key={index}  />
            })}
        </div>
        <div>
         <h3>Top Leagues</h3>
            {topLeagues.map((league, index) => {
                return <LeagueCard key={index}/>
            })}
        </div>
    </div>
    )
};

export default Home