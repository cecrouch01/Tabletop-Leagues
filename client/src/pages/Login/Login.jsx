import { useState } from 'react';
import './Login.css';
import { validateEmail, checkPassword } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

export default function Login() {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    // const handleInputChange = (e) => {
    //     const { target } = e;
    //     const inputType = target.name;
    //     const inputValue = target.value;

    //     // if (inputType === 'username') {
    //     //     setUsername(inputValue);
    //     if (inputType === 'email') {
    //         setEmail(inputValue);
    //     } else {
    //         setPassword(inputValue);
    //     }
    // };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // if (!validateEmail(email) || !password) {
        //     setErrorMessage('Email or password is invalid');
        //     return;
        // }

        // if (!checkPassword(password)) {
        //     setErrorMessage(
        //         `Password is invalid`
        //     );
        //     return;
        // }
        // alert(`Welcome ${username}!`);

        // setUsername('');
        try {
            const { data } = await loginUser({
              variables: { ...userFormData },
            });

            if (error) {
                // console.log(token);
                throw new Error('User not logged in')
            }
            console.log(data.loginUser.token);
      
            Auth.login(data.loginUser.token);
          } catch (err) {
            // console.log(data.loginUser);
            // console.log(token);
            console.error(err);
        }
        // setEmail('');
        // setPassword('');
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
                {/* <input
                    className='form-color'
                    value={username}
                    name="username"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Username"
                /> */}
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


