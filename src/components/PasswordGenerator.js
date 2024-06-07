import React, { useState } from 'react';
import axios from 'axios';
import './PasswordGenerator.css';

// Create an instance of Axios with a base URL
const api = axios.create({
    baseURL: 'https://localhost:7217/api/Password'
});

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(true);
    const [password, setPassword] = useState('');

    const generatePassword = async () => {
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialCharacters) {
            alert('Please select at least one checkbox.');
            return;
        }

        const response = await api.post('/generate', {
            length,
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSpecialCharacters
        });
        setPassword(response.data.password);
    };

    const storePassword = async () => {
        await api.post('/store', { password });
        alert('Password stored successfully');
    };

    const copyToClipboard = () => {
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Password copied to clipboard');
    };

    return (
        <div className="container">
            <h1>Password Generator</h1>
            <div className="form-group">
                <label className="label">
                    Length:
                    <input className="input" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
                </label>
            </div>
            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
                    Include Uppercase
                </label>
            </div>
            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
                    Include Lowercase
                </label>
            </div>
            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
                    Include Numbers
                </label>
            </div>
            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={includeSpecialCharacters} onChange={(e) => setIncludeSpecialCharacters(e.target.checked)} />
                    Include Special Characters
                </label>
            </div>
            <div className="buttons">
                <button className="button" onClick={generatePassword}>Generate Password</button>
                <button className="button" onClick={storePassword}>Store Password</button>
                {password && (
                    <button className="button" onClick={copyToClipboard}>Copy to Clipboard</button>
                )}
            </div>
            {password && (
                <div className="generated-password">
                    <h2>Generated Password</h2>
                    <p>{password}</p>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
