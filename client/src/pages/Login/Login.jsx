import { useState } from 'react';
import './Login.css';
import { validateEmail } from '../../utils/helpers';

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

        if (!validateEmail(email)) {
            setErrorMessage('Email is invalid');
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
                    value={username}
                    name="username"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    value={email}
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={password}
                    name="password"
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                />
                <button className="login-button" type="login">Login</button>
            </form>
            {errorMessage && (
                <div>
                    <p className="error-text">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}


