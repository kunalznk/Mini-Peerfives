import customAxios from "../utils/axios";

const rewardHistoryService = {
  createReward: async (userId, reward, receiverId) => {
    try {
      const response = await customAxios.post('/rewards', { userId, reward, receiverId });
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  getRewardHistoryByUserId: async (userId) => {
    try {
      const response = await customAxios.get(`/rewards/${userId}/rewards`);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  getPointsHistoryByUserId: async (userId) => {
    try {
      const response = await customAxios.get(`/rewards/${userId}/points`);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  deleteRewardById: async (id) => {
    try {
      const response = await customAxios.delete(`/rewards/${id}/reward`);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
};

export default rewardHistoryService;
