import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './CSS/SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        agreeToTerms: false
    });
    const { signup, loading, error: authError } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.agreeToTerms) {
            setError('Please agree to the Terms of Use and Privacy Policy');
            return;
        }

        const success = await signup(formData.fullName, formData.email, formData.password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="SignUp">
            <div className="SignUp-container">
                <h1>Create an Account</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-fields">
                        <label>
                            Full Name
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange} // Added onChange handler
                                placeholder="Enter your full name"
                                required
                            />
                        </label>
                        <label>
                            Email Address
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} // Added onChange handler
                                placeholder="Enter your email address"
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange} // Added onChange handler
                                placeholder="Create a password"
                                required
                            />
                        </label>
                    </div>
                    <div className="signup-agree">
                        <input
                            type="checkbox"
                            id="terms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange} // Added onChange handler
                            required
                        />
                        <label htmlFor="terms">
                            I agree to the <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
                        </label>
                    </div>
                    {(error || authError) && (
                        <div className="error-message">
                            {error || authError}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="signup-button"
                        disabled={loading || !formData.agreeToTerms}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;