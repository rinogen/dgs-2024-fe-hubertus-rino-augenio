/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAPI from '../../../hooks/useAPI';
import { XMarkIcon } from '@heroicons/react/16/solid';
import Swal from 'sweetalert2';

const Modal = ({ isOpen, onClose, category }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const { data: response, loading } = useAPI('wallets');
  const { createData, updateData } = useAPI('categories');

  const wallets = response?.data || [];

  useEffect(() => {
    if (category) {
      setCategoryName(category.name || '');
      setSelectedWallet(category.wallet || '');
    } else {
      setCategoryName('');
      setSelectedWallet('');
    }
  }, [category]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const categoryData = {
        name: categoryName,
        wallet: selectedWallet,
      };
      if (category) {
        await updateData(category._id, categoryData);
        Swal.fire('Updated!', 'Category updated successfully.', 'success');
        console.log('Category updated:', categoryData);
      } else {
        await createData(categoryData);
        Swal.fire('Created!', 'Category created successfully.', 'success');
        console.log('Category created:', categoryData);
      }
      onClose();
    } catch (error) {
      Swal.fire('Error!', 'Failed to save the category.', 'error');
      console.error('Error saving category:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg z-10 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">
            {category ? 'Update Category' : 'Add Category'}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Wallet</label>
            {loading ? (
              // Menampilkan pesan atau spinner saat loading
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-center">
                Loading wallets...
              </div>
            ) : (
              <select
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required>
                <option value="">Select a wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet._id} value={wallet._id}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
            {category ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
