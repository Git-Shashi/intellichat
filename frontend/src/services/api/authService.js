const BASE_URL = '/api/v1/users';

const authService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return { data }; // Return in the format the slice expects
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return { data }; // Return in the format the slice expects
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};

export default authService;