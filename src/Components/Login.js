import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setUsername }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form sent");

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response from the server:", data); 

      if (data.success && data.username) { 
        setToken(data.username); 
        alert('Login successful'); 
        setUsername(data.username); 
        navigate('/'); 
      } else {
        alert(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in, please try again later.");
    }
  };

  return (
    <div className="login-container"> 
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
