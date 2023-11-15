import { useState, useEffect } from 'react';
import "./Adminform.css";
import { QUERY_SINGLE_USER } from "../../utils/queries";
import { useQuery } from '@apollo/client';


const AdminForm = ({members}) => {
    const [memberArray, setMemberArray] = useState([]);
    useEffect(() => {
        if(members){
            const idArray = []
            for(let i = 0; i < members.length; i++) {
                idArray.push(members[i].user._id)
            }
            setMemberArray(idArray);
        }
    }, [members])
 
    const { loading, data: leagueArray} = useQuery(QUERY_SINGLE_USER, {variables: {id: memberArray}});
    console.log(leagueArray)
    const users = leagueArray?.getUser || {}
    console.log(users)
    return (
        <form className="admin-form" onSubmit={(event) => {
            event.preventDefault();
        }}>
            <h3>Placement</h3>
            {members.map((member, index) => {
                return (
                    <div key={index}>
                        <label>Ranking: {index + 1}</label>
                        <select name={`ranking-${index +1}`} >
                            {loading ? null : users.map((user, index) => {
                                return (
                                    <option key={index} value={user.username}>{user.username}</option>
                                )
                            })}
                        </select>
                    </div>
                )
            })}
           <button className='rank-submit'>Submit</button>
        </form>
    )
}

export default AdminForm