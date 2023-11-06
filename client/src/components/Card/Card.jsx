import UserCard from "../UserCard/UserCard";
import LeagueCard from "../LeagueCard/LeagueCard";
import './Card.css'

const Card = ({type}) => {
    //TODO: create a useReducer for return different style cards. 
    return (
    <div className={`card ${type}-card`}>
        <div>
            {type === 'user' ? <UserCard /> : null}
            {type === 'league' ? <LeagueCard /> : null}
        </div>
    </div>
    )
}

export default Card