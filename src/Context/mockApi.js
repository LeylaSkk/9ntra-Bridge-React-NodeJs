export const mockApi = {
    users: [], // This will store our users

    login: async (email, password) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockApi.users.find(u => 
            u.email === email && u.password === password
        );
        
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        // Don't send password back to client
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    },

    signup: async (fullName, email, password) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        if (mockApi.users.some(u => u.email === email)) {
            throw new Error('User already exists');
        }
        
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password
        };
        
        mockApi.users.push(newUser);
        
        // Don't send password back to client
        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword };
    }
};