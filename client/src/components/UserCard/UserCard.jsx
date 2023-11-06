import placeholder from '../../assets/75x75-placeholder.png' 
import './UserCard.css';
const UserCard = () => {
    return (
    <div className='user-card-contents'>
        <div>
            <h3>Username</h3>
            <img src={placeholder}/>
        </div>
        <div className='stats-table'>
            <h4>Stats</h4>
            <ul className='stat-list'>
                <li>Skill Points</li>
                <li>Total Wins</li>
                <li>Best Ranking</li>
            </ul>
        </div>
    </div>
    )
}

export default UserCard