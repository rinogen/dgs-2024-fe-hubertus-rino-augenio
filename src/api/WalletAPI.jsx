import apiClient from './apiConfig';

const WalletAPI = {
  getAll: () => apiClient.get('/wallets'),
  getById: (id) => apiClient.get(`/wallets/${id}`),
  create: (data) => apiClient.post('/wallets', data),
  update: (id, data) => apiClient.put(`/wallets/${id}`, data),
  delete: (id) => apiClient.delete(`/wallets/${id}`),
};

export default WalletAPI;
