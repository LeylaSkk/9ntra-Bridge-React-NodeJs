import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './CSS/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/'); // Redirect to home page after successful login
        }
    };

    return (
        <div className='login'>
            <div className='login-container'>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='login-fields'>
                        <input 
                            type='email' 
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type='password' 
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;