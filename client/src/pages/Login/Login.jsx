import { useState } from 'react';
import './Login.css';
import { validateEmail, checkPassword } from '../../utils/helpers';

export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'username') {
            setUsername(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else {
            setPassword(inputValue);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email) || !password) {
            setErrorMessage('Email or password is invalid');
            return;
        }

        if (!checkPassword(password)) {
            setErrorMessage(
                `Password is invalid`
            );
            return;
        }
        alert(`Welcome ${username}!`);

        setUsername('');
        setEmail('');
        setPassword('');

    };

    return (
        <div className="container text-center">
            <h2 className="page-header">Login</h2>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    className='form-color'
                    value={username}
                    name="username"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className='form-color'
                    value={email}
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email"
                />
                <input
                    className='form-color'
                    value={password}
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


