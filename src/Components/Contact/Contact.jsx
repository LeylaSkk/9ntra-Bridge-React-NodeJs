import React, { useState } from 'react';
import { contactApi } from '../../Services/contactApi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    successMessage: null,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (status.error) {
      setStatus(prev => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus({ loading: true, success: false, successMessage: null, error: null });
      
      const response = await contactApi.submitContact(formData);
      
      setStatus({ 
        loading: false, 
        success: true, 
        successMessage: response.message,
        error: null 
      });
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ 
          ...prev, 
          success: false, 
          successMessage: null 
        }));
      }, 5000);

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        successMessage: null,
        error: error.message
      });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contact Us</h2>
        {status.success && (
          <div className="success-message">
            {status.successMessage || "Thank you for your message! We'll get back to you soon."}
          </div>
        )}
        {status.error && (
          <div className="error-message">
            {status.error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Mathew"
              value={formData.name}
              onChange={handleChange}
              disabled={status.loading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status.loading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here"
              value={formData.message}
              onChange={handleChange}
              disabled={status.loading}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={status.loading}
          >
            {status.loading ? 'Sending...' : 'Send the message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;