import axiosInstance from './axiosInstance';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterPayload) {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  async login(data: LoginPayload) {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  async getAllUsers() {
    const response = await axiosInstance.get('/auth/users');
    return response.data;
  },

  async updateUser(id: string, data: any) {
    const response = await axiosInstance.put(`/auth/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await axiosInstance.delete(`/auth/users/${id}`);
    return response.data;
  },
};
