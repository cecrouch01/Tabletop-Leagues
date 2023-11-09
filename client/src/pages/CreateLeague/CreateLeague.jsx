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

        if (leagueName === '') {
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
        <div className="container text-center">
            <h2 className="page-header">Create a League</h2>
            <form className="create-league-frm" onSubmit={createLeague}>
                <input
                    placeholder="League Name"
                    type='text'
                    value={leagueName}
                    onChange={(event) => setLeagueName(event.target.value)}
                    className='frm-input'
                />

                <textarea
                    placeholder="League Description"
                    type='text'
                    value={leagueDescription}
                    className='frm-input'
                    id='description'
                    onChange={(event) => setLeagueDescription(event.target.value)}
                />
                <div className='btn-container'>
                    <button type='submit' className='create-league-btn'>Submit</button>
                </div>
                <div className='error-container'>
                    {nameErrorMessage ? <h2 className='error-message'>{nameErrorMessage}</h2> : null}
                </div>
            </form>
        </div>
    )
};

export default CreateLeague