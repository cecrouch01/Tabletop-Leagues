import Card from '../Card/Card'
import { Link } from 'react-router-dom'

import './LeagueCard.css'
const LeagueCard = ({ children, description, name, creator, totalPlayers, id }) => {
    if (!id) {
        id = "id";
    }
    
    return (
        <Link className='card-link' to={'/league/' + id}>
            <Card>
                <div className='league-card-contents'>
                    <div className='league-contents'>
                        <div>
                            <h3 className='league-name'>{name}</h3>
                            <p className='league-description'>
                                {description}
                            </p>
                            <ul className='league-list'>
                                <li >Creator: {creator ? creator : 'unknown'}</li>
                                <li >Size: {totalPlayers ? totalPlayers : 0} players </li>
                            </ul>
                        </div>
                        {children}
                    </div>
                </div>
            </Card>
        </Link>

    )
}

export default LeagueCard