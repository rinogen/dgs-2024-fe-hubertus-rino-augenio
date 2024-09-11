/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAPI from '../../../hooks/useAPI';
import { XMarkIcon } from '@heroicons/react/16/solid';
import Swal from 'sweetalert2';

const Modal = ({ isOpen, onClose, wallet }) => {
  const [walletName, setWalletName] = useState('');
  const { createData, updateData } = useAPI('wallets');

  useEffect(() => {
    if (wallet) {
      setWalletName(wallet.name || '');
    } else {
      setWalletName('');
    }
  }, [wallet]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newWallet = {
        name: walletName,
      };
      if (wallet) {
        await updateData(wallet._id, newWallet);
        Swal.fire('Updated!', 'Wallet updated successfully.', 'success');
        console.log('Wallet updated:', newWallet);
      } else {
        await createData(newWallet);
        Swal.fire('Created!', 'Wallet created successfully.', 'success');
        console.log('Wallet created:', newWallet);
      }
      onClose();
    } catch (error) {
      Swal.fire('Error!', 'Failed to save the Wallet.', 'error');
      console.error('Error creating Wallet:', error);
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
            {wallet ? 'Update Category' : 'Add Category'}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Wallet Name</label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
            {wallet ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
