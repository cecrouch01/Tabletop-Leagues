import UserCard from "../UserCard/UserCard";
import LeagueCard from "../LeagueCard/LeagueCard";

const Card = ({type}) => {
    return (
    <div className={`card ${type}-card`}>
        <h2>{type} Card</h2>
        <div>
            {type === 'user' ? <UserCard /> : null}
            {type === 'league' ? <LeagueCard /> : null}
        </div>
    </div>
    )
}

export default Card