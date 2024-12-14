import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSSstyle/Login.css'

function Login() {
  const navigate = useNavigate();
  let email = '';
  let password = '';
  let message = '';

  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:2000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const userData = await response.json();
      navigate("/");
    }
    catch (error) {
      message = error.message;
      alert(message);
    };
  };

  return (
    <div className="form-section">
      <h3>User Login</h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => (email = e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => (password = e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
