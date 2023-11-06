import placeholder from '../../assets/75x75-placeholder.png' 
import './LeagueCard.css'
const LeagueCard = () => {
    return (
    <div className='league-card-contents'>
        <div className='league-description'>
            <img src={placeholder} />
            <div>
                <h3>League Name</h3>
                <ul>
                    <li>Number of League Games</li>
                    <li>Total Amount of Players</li>
                    <li>Format</li>
                    <li>This is just a visible note</li>
                    <li>use useReducer instead of the card set up we have now</li>
            </ul>
            </div>
        </div>
    </div>
    )
}

export default LeagueCard