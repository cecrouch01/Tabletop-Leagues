import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { checkPassword } from '../../utils/helpers';
import { CREATE_LEAGUE } from '../../utils/actions';
import { useColosseumContext } from '../../utils/ColosseumContext';
import Auth from '../../utils/auth';
import { ADD_LEAGUE } from '../../utils/mutations';
import './CreateLeague.css';

const CreateLeague = () => {
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    

    const [addCreateLeagueData, setAddCreateLeagueData] = useState({ name: '', description: '', password: '' })
    const [addLeague, { error }] = useMutation(ADD_LEAGUE);
    const [state, dispatch] = useColosseumContext();

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAddCreateLeagueData({ ...addCreateLeagueData, [name]: value })
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            throw new Error('User not signed in');
        }

        try {
            const newLeague = await addLeague({
                variables: { ...addCreateLeagueData }
            })
            console.log(newLeague)
            //TODO: make it so newLeague doesn't have null variables then add it to dispatch state. 
            // dispatch({type: CREATE_LEAGUE, payload: newLeague})
            alert('League created!');

        } catch (error) {
            console.log(token);
            console.log(addCreateLeagueData);
            console.log(error);
            throw new Error("sign up didn't work");
        }
        setAddCreateLeagueData({
            name: '',
            description: '',
            password: '',
        })
    };

    return (
        <div className="container text-center">
            <h2 className="page-header">Create a League</h2>
            <form className="create-league-frm" onSubmit={handleFormSubmit}>
                <input
                    placeholder="League Name"
                    type='text'
                    name='name'
                    value={addCreateLeagueData.name}
                    onChange={handleInputChange}
                    className='frm-input'
                />
                <input
                    placeholder="Create Password"
                    type='password'
                    name='password'
                    value={addCreateLeagueData.password}
                    onChange={handleInputChange}
                    className='frm-input'
                />

                <textarea
                    placeholder="League Description"
                    type='text'
                    name='description'
                    value={addCreateLeagueData.description}
                    className='frm-input'
                    id='description'
                    onChange={handleInputChange}
                />
                <div className='btn-container'>
                    <button type='submit' className='create-league-btn'>Submit</button>
                </div>
                <div className='error-container'>
                    {nameErrorMessage ? <h2 className='error-message'>{nameErrorMessage}</h2> : null}
                    {passwordErrorMessage ? <h2 className='error-message'>{passwordErrorMessage}</h2> : null}
                </div>
            </form>
        </div>
    )
};

export default CreateLeague;