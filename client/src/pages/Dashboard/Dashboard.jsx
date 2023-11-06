import Card from '../../components/Card/Card'
import './Dashboard.css'
const Dashboard = () => {
    const recordArr = [1,2,3];
    const activeLeague = [1,2,3];
    return (
    <> 
        <div className='dshbrd-user-card'>
            <Card type='user'/>
        </div>
        <div className='dshbrd-contents'>
            <section className='user-record'>
                {/* I think we can use useReducer to change the card formats instead of using different cards */}
                <h2>Record</h2>
                {recordArr.map((record, index) => {
                    return <Card key={index} type='league' />
                })}
            </section>
            <section className='active-leagues'>
                <h2>Active Leagues</h2>
                {activeLeague.map((league, index) => {
                    return <Card key={index} type='league' />
                })}
            </section>
        </div>
    </>
    )
}

export default Dashboard