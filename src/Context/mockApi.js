export const mockApi = {
    get users() {
        return JSON.parse(localStorage.getItem('mockUsers') || '[]');
    },
    
    set users(value) {
        localStorage.setItem('mockUsers', JSON.stringify(value));
    },

    login: async (email, password) => {
        // Input validation
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockApi.users;
        const user = users.find(u => u.email === email);

        // User not found
        if (!user) {
            throw new Error('No account found with this email');
        }

        // Password check
        if (user.password !== password) {
            throw new Error('Incorrect password');
        }
        
        // Remove password from returned user object
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    },

    signup: async (fullName, email, password) => {
        // Input validation
        if (!email || !password || !fullName) {
            throw new Error('All fields are required');
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Password strength validation
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockApi.users;
        if (users.some(u => u.email === email)) {
            throw new Error('An account with this email already exists');
        }
        
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        mockApi.users = [...users, newUser];
        
        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword };
    },

    // Helper method to check if user exists
    checkUserExists: async (email) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const users = mockApi.users;
        return users.some(u => u.email === email);
    },

    // Helper method to clear all users (for testing)
    clearUsers: () => {
        localStorage.removeItem('mockUsers');
    }
};