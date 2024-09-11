import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import useAPI from '../../../hooks/useAPI';
import { getWallets } from '../../../data/getWallets';
import Modal from '../../modal/wallet/Modal';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Wallet = () => {
  const {
    data: response,
    loading,
    error,
    deleteData,
    fetchData,
    fetchDataById,
  } = useAPI('wallets');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);

  const openModal = async (walletId = null) => {
    if (walletId) {
      try {
        const wallet = await fetchDataById(walletId);
        console.log('Fetched wallet:', wallet);
        setEditingWallet(wallet);
      } catch (error) {
        console.error('Error fetching wallet details:', error);
      }
    } else {
      setEditingWallet(null);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWallet(null);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const wallets = response?.data || [];

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this wallet!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting...',
          text: 'Please wait while the wallet is being deleted.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        await deleteData(id);
        Swal.fire('Deleted!', 'The category has been deleted.', 'success');
        fetchData();
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'An error occurred while deleting the category.',
        'error'
      );
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="my-8 p-4">
      <div className="flex justify-between items-center mb-8 space-x-4">
        <h2 className="text-lg font-semibold">Wallets</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center w-10 h-10 custom-dashed-border text-gray-400 hover:text-white hover:border-solid hover:bg-gray-400 transition-all duration-200 ease-in-out">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {wallets.length > 0 ? (
        wallets.map((wallet) => {
          const { src } = getWallets(wallet.name);

          const totalIncome = wallet.expenseItems
            .filter((item) => item.flowType === 'income')
            .reduce((acc, item) => acc + item.amount, 0);

          const formatAmount = (amount) => {
            return parseFloat(amount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            });
          };

          return (
            <div key={wallet._id} className="space-y-4">
              <div
                onClick={() => openModal(wallet._id)}
                className="flex items-center space-x-4 transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                <button className="w-10 h-10 rounded-md overflow-hidden border border-gray-300">
                  <img
                    src={src}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="flex flex-col flex-grow">
                  <h2 className="text-black font-bold">{wallet.name}</h2>
                  <p className="text-gray-400 text-sm">
                    Balance: {formatAmount(totalIncome)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(wallet._id);
                  }}
                  className="flex items-center justify-center w-6 h-6 rounded-md overflow-hidden bg-red-100 text-red-400 hover:bg-red-400 hover:text-white">
                  <TrashIcon className="w-4 h-4 " />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No wallets found.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} wallet={editingWallet} />
    </div>
  );
};

export default Wallet;
