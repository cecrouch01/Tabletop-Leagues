import { useState } from 'react';
import { GiAlienSkull, GiAngelWings, GiAries, GiBattleAxe, GiBull } from 'react-icons/gi';
import placeholder from '../../assets/75x75-placeholder.png'
import Card from '../Card/Card';
import './UserCard.css';
const UserCard = ({ username, wins, icon, description, place}) => {
    const iconFuction = (icon) => {
        switch (icon) {
            case 'alien':
                return <GiAlienSkull className='user-icon' />
            case 'angel':
                return <GiAngelWings className='user-icon' />
            case 'aries':
                return <GiAries className='user-icon' />
            case 'axe':
                return <GiBattleAxe className='user-icon' />
            case 'bull':
                return <GiBull className='user-icon' />
            default:
                return <img src={placeholder} className='user-icon' />
        }
    }
    return (
        <Card className='card'>
            {place ? <h2 className='placing'>Place: {place}</h2> : null}
            <div className='user-card-contents'>
                <div>
                    <h3 className='username'>{username}</h3>
                    {iconFuction(icon)}
                </div>
                <div className='stats-table'>
                    <h3 className='stats'>Stats</h3>
                    <ul className='stat-list'>
                        <li>Skill Points: Future Development</li>
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