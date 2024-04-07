import React, { useState } from 'react';
import axios from 'axios';
import '../styles/passwordGenerator.css'; 

const PasswordGenerator = () => {
  // State variables to manage password generation and user input
  const [length, setLength] = useState(12); // Password length
  const [includeNumbers, setIncludeNumbers] = useState(false); // Whether to include numbers in the password
  const [includeSymbols, setIncludeSymbols] = useState(false); // Whether to include symbols in the password
  const [generatedPassword, setGeneratedPassword] = useState(''); // The generated password
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display if password generation fails

  // Function to handle password generation
  const handleGeneratePassword = async () => {
    try {
      // Validate password length
      if (length <= 0) {
        setErrorMessage('Password length must be greater than 0');
        setGeneratedPassword('');
        return;
      }
      if (length > 1000) {
        setErrorMessage('Password length cannot exceed 1000 characters');
        setGeneratedPassword('');
        return;
      }

      // Make POST request to the backend API to generate a password
      const response = await axios.post('http://localhost:8000/generate-password', {
        length,
        include_numbers: includeNumbers,
        include_symbols: includeSymbols
      });

      // Update state with the generated password
      setGeneratedPassword(response.data.password);
      setErrorMessage('');
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error generating password:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail); // Display error message from the server
      } else {
        setErrorMessage('An unexpected error occurred.'); // Display a generic error message
      }
      setGeneratedPassword('');
    }
  };

  // JSX to render the password generator component
  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="input-container">
        <label htmlFor="length">Password Length:</label>
        <input
          type="number"
          id="length"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        {(length < 8 || length > 1000) && (
          <p className="warning-message">
            {length < 8
              ? 'Warning: For better security, passwords should be at least 8 characters long.'
              : 'Warning: Password length cannot exceed 1000 characters.'}
          </p>
        )}
      </div>
      <div className="input-container">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
      </div>
      <div className="input-container">
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>
      </div>
      <div className="button-container">
        <button onClick={handleGeneratePassword} disabled={length < 8 || length > 1000}>
          Generate Password
        </button>
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
      {generatedPassword && (
        <div className="output-container">
          <h3>Generated Password:</h3>
          <p>{generatedPassword}</p>
        </div>
      )}
    </div>
  );  
};

export default PasswordGenerator;
