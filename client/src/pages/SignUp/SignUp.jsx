import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useColosseumContext } from '../../utils/ColosseumContext';
import './SignUp.css';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import IconSelector from '../../components/IconSelector/IconSelector';


export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState('');
    const [addUserFormData, setAddUserFormData] = useState({ username: '', email: '', password: '', description: '' })
    //State is being used to grab the icon from the Icon Selector Component
    const [state, dispatch] = useColosseumContext();
    const [addUser, { error }] = useMutation(ADD_USER)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAddUserFormData({ ...addUserFormData, [name]: value })
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...addUserFormData, icon: state.icon }
            })
            console.log(data);
            if (error) {
                throw new Error("sign up didn't work")
            }
            console.log(data.addUser.token);
            Auth.login(data.addUser.token);
            alert(`Welcome to Colosseum!`);
        } catch (err) {
            console.log(err)
        }
        setAddUserFormData({
            username: '',
            email: '',
            password: '',
            description: ''
        })
    }

    return (
        <div className="container text-center">
            <h2 className="page-header">Sign Up</h2>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    className='form-color'
                    value={addUserFormData.username}
                    name="username"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className='form-color'
                    value={addUserFormData.email}
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email"
                />
                <input
                    className='form-color'
                    value={addUserFormData.password}
                    name="password"
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                />
                <textarea
                    className='form-color'
                    id='aboutMeBody'
                    value={addUserFormData.description}
                    name="description"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Tell us about yourself"
                />
                <IconSelector />
                <div className='btn-container'>
                    <button className="sign-up-button" type="submit">Sign Up</button>
                </div>
            </form>
            {errorMessage && (
                <div>
                    <h2 className="error-text">{errorMessage}</h2>
                </div>
            )}
        </div>
    );
}