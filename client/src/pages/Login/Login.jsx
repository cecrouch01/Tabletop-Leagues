import { useState } from 'react';
import './Login.css';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [loginUser, { error }] = useMutation(LOGIN_USER);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({
              variables: { ...userFormData },
            });

            if (error) {
                throw new Error('User not logged in')
            }
            Auth.login(data.loginUser.token);
          } catch (err) {
            console.error(err);
        }
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });

    };

    return (
        <div className="container text-center">
            <h2 className="page-header">Login</h2>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    className='form-color'
                    value={userFormData.email}
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email"
                />
                <input
                    className='form-color'
                    value={userFormData.password}
                    name="password"
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                />
                <div className='button-container'>
                    <button className="login-button" type="login">Login</button>
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


