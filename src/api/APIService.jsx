import apiClient from './apiConfig';

const APIService = (resource) => ({
  getAll: () => apiClient.get(`/${resource}`),
  getById: (id) => apiClient.get(`/${resource}/${id}`),
  create: (data) => apiClient.post(`/${resource}`, data),
  update: (id, data) => apiClient.put(`/${resource}/${id}`, data),
  delete: (id) => apiClient.delete(`/${resource}/${id}`),
});

export default APIService;
