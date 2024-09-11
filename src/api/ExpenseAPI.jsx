import apiClient from './apiConfig';

const ExpenseAPI = {
  getAll: () => apiClient.get('/expenses'),
  getById: (id) => apiClient.get(`/expenses/${id}`),
  create: (data) => apiClient.post('/expenses', data),
  update: (id, data) => apiClient.put(`/expenses/${id}`, data),
  delete: (id) => apiClient.delete(`/expenses/${id}`),
};

export default ExpenseAPI;
