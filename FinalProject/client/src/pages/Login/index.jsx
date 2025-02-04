import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.post("http://localhost:8080/login", { email, password });
      const data = response.data;
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Xəta:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Giriş zamanı xəta baş verdi"
      );
    }
  };
  return (
    <>
     <div style={containerStyle}>
      
      <div style={logoStyle}>MarvelVerseHub</div>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Giriş</h2>
        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email ünvanınızı daxil edin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <label htmlFor="password" style={labelStyle}>Şifrə:</label>
        <input
          type="password"
          id="password"
          placeholder="Şifrənizi daxil edin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Giriş et</button>
      </form>
    </div>
    </>
  )
}

export default Login