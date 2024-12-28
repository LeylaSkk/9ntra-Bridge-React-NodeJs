// src/Services/contactApi.js
export const contactApi = {
    submissions: [], // Store submissions in memory

    submitContact: async (formData) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Validate form data
        if (!formData.name.trim()) {
            throw new Error('Name is required');
        }
        if (!formData.email.trim()) {
            throw new Error('Email is required');
        }
        if (!formData.message.trim()) {
            throw new Error('Message is required');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Invalid email format');
        }

        // Create submission with timestamp
        const submission = {
            id: Date.now(),
            ...formData,
            timestamp: new Date().toISOString()
        };

        // Store submission
        contactApi.submissions.push(submission);
        
        // Return success response with message that matches the Contact component
        return { 
            success: true, 
            message: "Thank you for your message! We'll get back to you soon."
        };
    },

    // Optional: Method to get all submissions (useful for testing)
    getSubmissions: () => {
        return contactApi.submissions;
    },

    // Optional: Method to clear submissions (useful for testing)
    clearSubmissions: () => {
        contactApi.submissions = [];
        return true;
    }
};