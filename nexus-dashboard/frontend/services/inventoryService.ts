import axiosInstance from './axiosInstance';

export const inventoryService = {
  async getAll(filters?: any) {
    const response = await axiosInstance.get('/inventory', { params: filters });
    return response.data;
  },

  async getById(id: string) {
    const response = await axiosInstance.get(`/inventory/${id}`);
    return response.data;
  },

  async create(data: any) {
    const response = await axiosInstance.post('/inventory', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await axiosInstance.put(`/inventory/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await axiosInstance.delete(`/inventory/${id}`);
    return response.data;
  },

  async getLowStock() {
    const response = await axiosInstance.get('/inventory/low-stock');
    return response.data;
  },

  async getStats() {
    const response = await axiosInstance.get('/inventory/stats');
    return response.data;
  },
};
