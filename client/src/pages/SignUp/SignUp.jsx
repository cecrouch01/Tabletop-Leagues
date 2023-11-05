import { useState } from 'react';
import './SignUp.css';
import { validateEmail } from '../../utils/helpers';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'firstName') {
            setFirstName(inputValue);
        } else if (inputType === 'lastName') {
            setLastName(inputValue);
        } else if (inputType === 'username') {
            setUsername(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'password') {
            setPassword(inputValue);
        } else {
            setAboutMe(inputValue);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Email is invalid');
            return;
        }

        alert(`Welcome ${username}!`);

        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setAboutMe('');
    }

    return (
        <div className="container text-center">
            <h2 className="page-header">Sign Up</h2>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    value={firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    value={lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Last Name"
                />
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
                <textarea
                    id='aboutMeBody'
                    value={aboutMe}
                    name="aboutMe"
                    onChange={handleInputChange}
                    type="aboutMe"
                    placeholder="Tell us about yourself"
                />
                <button className="sign-up-button" type="signUp">Sign Up</button>
            </form>
            {errorMessage && (
                <div>
                    <p className="error-text">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}

