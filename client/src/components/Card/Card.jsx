import UserCard from "../UserCard/UserCard";
import LeagueCard from "../LeagueCard/LeagueCard";
import './Card.css'

const Card = ({children}) => {
    //TODO: create a useReducer for return different style cards. 
    return (
    <div className={`card` }>
        {children}
    </div>
    )
}

export default Card