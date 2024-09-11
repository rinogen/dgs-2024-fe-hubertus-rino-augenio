/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import useAPI from '../../../hooks/useAPI';
import Swal from 'sweetalert2';

const Modal = ({ isOpen, onClose, expense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFlowType, setSelectedFlowType] = useState('');

  const { data: responseWallet, loading } = useAPI('wallets');
  const { data: responseCategory } = useAPI('categories');
  const { createData, updateData } = useAPI('expense-items');

  const wallets = responseWallet?.data || [];
  const categories = responseCategory?.data || [];

  useEffect(() => {
    if (expense) {
      setTitle(expense.title || '');
      setAmount(expense.amount || '');
      setSelectedWallet(expense.wallet);
      setSelectedCategory(expense.category);
      setSelectedFlowType(expense.flowType);
    } else {
      setTitle('');
      setAmount('');
      setSelectedWallet('');
      setSelectedCategory('');
      setSelectedFlowType('');
    }
  }, [expense]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const expanseData = {
        title: title,
        amount: parseFloat(amount),
        wallet: selectedWallet,
        category: selectedCategory,
        flowType: selectedFlowType,
      };
      if (expense) {
        await updateData(expense._id, expanseData);
        Swal.fire('Updated!', 'Expense updated successfully.', 'success');
        console.log('Expanse updated:', expanseData);
      } else {
        await createData(expanseData);
        Swal.fire('Created!', 'Expense created successfully.', 'success');
        console.log('Expanse created:', expanseData);
      }
      onClose();
    } catch (error) {
      Swal.fire('Error!', 'Failed to save the expense.', 'error');
      console.error('Error saving expense:', error);
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
            {expense ? 'Update Expense' : 'Add Expense'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Wallet
            </label>
            {loading ? (
              // Menampilkan pesan atau spinner saat loading
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-center">
                Loading wallets...
              </div>
            ) : (
              <select
                value={selectedWallet}
                onChange={(event) => setSelectedWallet(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required>
                <option value="">Select a Wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet._id} value={wallet._id}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Category
            </label>
            {loading ? (
              // Menampilkan pesan atau spinner saat loading
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-center">
                Loading category...
              </div>
            ) : (
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full px-3 py-2  border border-gray-300 rounded-md"
                required>
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Flowtype
            </label>
            <select
              value={selectedFlowType}
              onChange={(event) => setSelectedFlowType(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required>
              <option value="">Select Flowtype</option>
              <option value="outcome">Outcome</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
