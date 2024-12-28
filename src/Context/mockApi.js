export const mockApi = {
    get users() {
        return JSON.parse(localStorage.getItem('mockUsers') || '[]');
    },
    
    set users(value) {
        localStorage.setItem('mockUsers', JSON.stringify(value));
    },

    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockApi.users;
        const user = users.find(u => 
            u.email === email && u.password === password
        );
        
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    },

    signup: async (fullName, email, password) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const users = mockApi.users;
        if (users.some(u => u.email === email)) {
            throw new Error('User already exists');
        }
        
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password
        };
        
        mockApi.users = [...users, newUser];
        
        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword };
    }
};