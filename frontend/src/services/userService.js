import customAxios from "../utils/axios";

const userService = {
  createUser: async (name) => {
    try {
      const response = await customAxios.post('/users', { name });
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  getUsers: async () => {
    try {
      const response = await customAxios.get('/users');
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await customAxios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
};

export default userService;
