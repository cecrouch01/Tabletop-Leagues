import Card from '../../components/Card/Card'
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import UserCard from '../../components/UserCard/UserCard';
import './Dashboard.css'
const Dashboard = () => {
    const recordArr = [1, 2, 3];
    const activeLeague = [1, 2, 3];
    
    return (
        <div className='dshbrd-container'>
            <div className='dshbrd-user-card'>
                <UserCard />
            </div>
            <div className='dshbrd-contents'>
                <section className='user-record'>
                    {/* I think we can use useReducer to change the card formats instead of using different cards */}
                    <h2 className='column-title'>Record</h2>
                    {recordArr.map((record, index) => {
                        return <LeagueCard key={index} />
                    })}
                </section>
                <section className='active-leagues'>
                    <h2 className='column-title'>Active Leagues</h2>
                    {activeLeague.map((league, index) => {
                        return <LeagueCard key={index} />
                    })}
                </section>
            </div>
        </div>
    )
}

export default Dashboard