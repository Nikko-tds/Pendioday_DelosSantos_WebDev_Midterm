import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../api/authService';

export const AuthForm: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthForm must be used within AuthProvider');
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const { token } = await login(username, password);
        context.dispatch({ type: 'SET_AUTH', payload: {user: username, token: token} });
      } else {
        await register(username, password);
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isLogin ? 'Sign In' : 'Register'}</h3>
      {error && <p className="text-red-500">{error}</p>}
      
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      
      <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
      
      <p className="text-center cursor-pointer text-[#ff6347]" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Log in"}
      </p>
    </form>
  );
};