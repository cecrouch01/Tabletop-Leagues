import Card from "../../components/Card/Card";
import './Home.css';
const Home = () => {
    const highScores = [1,2,3,4,5]
    const topLeagues = [1,2,3,4,5]
    return (
    <div className="home-body">
        <div>
            <h3>Skilled Users</h3>
            {highScores.map((user, index) => {
                return <Card key={index} type='user' />
            })}
        </div>
        <div>
         <h3>Top Leagues</h3>
            {topLeagues.map((league, index) => {
                return <Card key={index} type='league' />
            })}
        </div>
    </div>
    )
};

export default Home