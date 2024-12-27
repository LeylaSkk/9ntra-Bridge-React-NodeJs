import React from 'react';
import './CSS/SignUp.css';

const SignUp = () => {
    return (
        <div className="SignUp">
            <div className="SignUp-container">
                <h1>Create an Account</h1>
                <form className="signup-form">
                    <div className="signup-fields">
                        <label>
                            Full Name
                            <input type="text" placeholder="Enter your full name" required />
                        </label>
                        <label>
                            Email Address
                            <input type="email" placeholder="Enter your email address" required />
                        </label>
                        <label>
                            Password
                            <input type="password" placeholder="Create a password" required />
                        </label>
                    </div>
                    <div className="signup-agree">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">
                            I agree to the <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
                        </label>
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
