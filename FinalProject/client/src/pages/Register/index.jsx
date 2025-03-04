import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
  };

  const logoStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ED1D24', 
    marginBottom: '20px'
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
    color: '#333'
  };

  const inputStyle = {
    width: '95%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ED1D24', 
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/register', { name, email, password });
        alert("Registration was successful!");
        navigate('/login');
    } catch (error) {
        console.error("Error details:", error);

        if (error.response) {
            alert(error.response.data.message || "An unknown error response was received from the server.");
        } else if (error.request) {
            alert("Failed to connect to server. Does the backend work?");
        } else {
            alert("An unknown error has occurred: " + error.message);
        }
    }
};

  return (
    <>
     <div style={containerStyle}>
      <div style={logoStyle}>MarvelVerseHub</div>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Qeydiyyat</h2>
        <label htmlFor="username" style={labelStyle}>İstifadəçi adı:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />
        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
    </>
  )
}

export default Register