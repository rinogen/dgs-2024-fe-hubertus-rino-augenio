import { useState, useEffect } from 'react';
import APIService from '../api/APIService';

const useAPI = (resource) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiService = APIService(resource);

  //Ambil semua list data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAll();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //Ambil data berdasarkan id
  const fetchDataById = async (id) => {
    try {
      setLoading(true);
      const response = await apiService.getById(id);
      console.log('API Response:', response); // Debugging
      return response.data.data;
    } catch (error) {
      throw new error('Error fetching data by ID');
    } finally {
      setLoading(false);
    }
  };

  //Tambah data baru
  const createData = async (newData) => {
    try {
      setLoading(true);
      const response = await apiService.create(newData);
      await fetchData();
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //Update data
  const updateData = async (id, updateData) => {
    try {
      setLoading(true);
      await apiService.update(id, updateData);
      fetchData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //Hapus data
  const deleteData = async (id) => {
    try {
      setLoading(true);
      await apiService.delete(id);
      await fetchData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch categories on component mount
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    fetchDataById,
    createData,
    updateData,
    deleteData,
  };
};

export default useAPI;
