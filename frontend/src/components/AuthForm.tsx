import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../api/authService';

export const AuthForm: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthForm must be used within AuthProvider');
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [role, setRole] = useState('DEVELOPER')
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const { token } = await login(email, passwordHash, role);
        context.dispatch({ type: 'LOGIN', payload: token});
      } else {
        await register(email, passwordHash, role);
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
      
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={passwordHash} onChange={e => setPasswordHash(e.target.value)} required />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="DEVELOPER">Developer</option>
        <option value="LEAD">Lead</option>
      </select>
      
      <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
      
      <p className="text-center cursor-pointer text-[#ff6347]" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Log in"}
      </p>
    </form>
  );
};