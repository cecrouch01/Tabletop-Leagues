import Card from '../../components/Card/Card'
import './Dashboard.css'
const Dashboard = () => {
    const recordArr = [];
    const activeLeague = [1,2,3];
    return (
    <> 
        <Card type='user'/>
        <div className='dshbrd-contents'>
            <section className='user-record'>
                <h2>Record</h2>
            </section>
            <section className='active-leagues'>
                <h2>Active League</h2>
                {activeLeague.map((league, index) => {
                    return <Card key={index} type='league' />
                })}
            </section>
        </div>
    </>
    )
}

export default Dashboard