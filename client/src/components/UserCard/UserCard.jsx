import { useState } from 'react';
import { GiAlienSkull, GiAngelWings, GiAries, GiBattleAxe, GiBull } from 'react-icons/gi';
import placeholder from '../../assets/75x75-placeholder.png'
import Card from '../Card/Card';
import './UserCard.css';
const UserCard = ({username, wins, icon, description}) => {
    const iconFuction = (icon) => {
        switch (icon) {
            case 'alien':
                return <GiAlienSkull className='user-icon' />
            case 'angel':
                return <GiAngelWings className='user-icon' />
            case 'aries':
                return <GiAries className='user-icon' />
            case 'battle-axe':
                return <GiBattleAxe className='user-icon' />
            case 'bull':
                return <GiBull className='user-icon' />
            default:
                return <img src={placeholder} className='user-icon' />
        }
    }
    return (
        <Card className='card'>
            <div className='user-card-contents'>
                <div>
                    <h3 className='username'>{username}</h3>
                    {iconFuction(icon)}
                </div>
                <div className='stats-table'>
                    <h3 className='stats'>Stats</h3>
                    <ul className='stat-list'>
                        <li>Skill Points</li>
                        <li>Total Wins: {wins}</li>
                        {/* <li>Best Ranking</li> */}
                        <li>{description}</li>
                    </ul>
                </div>
            </div>
        </Card>
    )
}

export default UserCard