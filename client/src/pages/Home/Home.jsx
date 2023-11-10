import Card from "../../components/Card/Card";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import UserCard from "../../components/UserCard/UserCard";
import './Home.css';
const Home = () => {
    const highScores = [1, 2, 3, 4, 5]
    const topLeagues = [1, 2, 3, 4, 5]
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