import axiosInstance from './axiosInstance';

export const billService = {
  async getAll(filters?: any) {
    const response = await axiosInstance.get('/bills', { params: filters });
    return response.data;
  },

  async getById(id: string) {
    const response = await axiosInstance.get(`/bills/${id}`);
    return response.data;
  },

  async create(data: any) {
    const response = await axiosInstance.post('/bills', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await axiosInstance.put(`/bills/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await axiosInstance.delete(`/bills/${id}`);
    return response.data;
  },

  async getStats() {
    const response = await axiosInstance.get('/bills/stats');
    return response.data;
  },
};
