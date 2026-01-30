import axiosInstance from './axiosInstance';

export const dashboardService = {
  async getStats() {
    const response = await axiosInstance.get('/dashboard/stats');
    return response.data;
  },

  async getChartData(days?: number) {
    const response = await axiosInstance.get('/dashboard/chart-data', {
      params: { days: days || 7 },
    });
    return response.data;
  },
};
