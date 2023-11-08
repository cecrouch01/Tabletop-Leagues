import { useState } from 'react';
import { useColosseumContext } from '../../utils/ColosseumContext';
import { TEST } from '../../utils/actions';

import './CreateLeague.css';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueDescription, setLeagueDescription] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    
    
    const createLeague = (e) => {
        e.preventDefault();

        if(leagueName === '') {
           setNameErrorMessage('Please input a league name');
           return;
        }
        //TODO: Tie this form to the back end
        console.log(leagueName)
        console.log(leagueDescription)
        setLeagueName('');
        setLeagueDescription('');
        setNameErrorMessage('');
    }

    return (
    <>
        <h3 className="page-title">Create a League</h3>
        <form className="create-league-frm" onSubmit={createLeague}>
            <div>
                <h4 className='input-title'>Enter League Name</h4>
                <input
                type='text'
                value={leagueName}
                onChange={(event) => setLeagueName(event.target.value)}
                className='frm-input-title'
                />
                {nameErrorMessage ? <p className='error-message'>{nameErrorMessage}</p> : null}
                <h4 className='description-title'>Enter League Description</h4>
                <textarea
                type='text'
                value={leagueDescription}
                className='frm-textarea-description'
                onChange={(event)=> setLeagueDescription(event.target.value)}
                />
            </div>
            <button type='submit' className='create-league-btn'>Submit</button>
        </form>
    </>
    )
};

export default CreateLeague