import Card from '../Card/Card'

import './LeagueCard.css'
const LeagueCard = () => {
    return (
    <Card>
        <div className='league-card-contents'>
            <div className='league-contents'>
                <div>
                    <h3 className='league-name'>League Name</h3>
                    <p className='league-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <ul className='league-list'>
                        <li >Creator: John Smith</li>
                        <li >Size: X players </li>
                    </ul>
                </div>
            </div>
        </div>
    </Card>
    )
}

export default LeagueCard