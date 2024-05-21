import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, userType } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true when login process starts
      await logIn(email, password);

      // Navigate to the appropriate dashboard based on user type
      if (userType === 'student') {
        navigate('/student-dashboard');
      } else if (userType === 'faculty') {
        navigate('/faculty-dashboard');
      } else {
        throw new Error('Unknown user type');
      }
    } catch (error) {
      setError('Failed to log in. Please try again.');
      console.error("Failed to log in", error);
    } finally {
      setLoading(false); // Set loading state to false after login process completes
    }
  };

  return (
    <div className='login'>
      <div className="content">
        <h1>Welcome to <span>PG-Pedia</span></h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
