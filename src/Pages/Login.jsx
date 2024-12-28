import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './CSS/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login, loading, error: authError } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        const success = await login(formData.email, formData.password);
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
                            name="email"
                            placeholder='Email Address'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type='password'
                            name="password" 
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {(error || authError) && (
                        <div className="error-message">
                            {error || authError}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;