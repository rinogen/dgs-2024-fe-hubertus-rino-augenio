import { BookmarkIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '../modal/expanse/Modal';
import { useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { getRandomIconButton } from '../../utils/randomIconButton';
import Swal from 'sweetalert2';

const ExpanseItem = () => {
  const {
    data: response,
    loading,
    error,
    deleteData,
    fetchData,
    fetchDataById,
  } = useAPI('expense-items');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const expense = response?.data || [];

  const numberOfTransactions = expense.length;
  const totalValue = expense
    .reduce((total, item) => total + parseFloat(item.amount), 0)
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  const openModal = async (expenseId = null) => {
    if (expenseId) {
      try {
        const expense = await fetchDataById(expenseId);
        console.log('Fetched expense:', expense); // Debugging
        setEditingExpense(expense);
      } catch (error) {
        console.error('Error fetching expense details:', error);
      }
    } else {
      setEditingExpense(null);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this expense!',
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
          text: 'Please wait while the expense is being deleted.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        await deleteData(id);
        Swal.fire('Deleted!', 'The expense has been deleted.', 'success');
        fetchData();
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'An error occurred while deleting the expense.',
        'error'
      );
      console.error('Error deleting category:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold">February 29 2024</h2>
        <div className="flex justify-between items-center space-x-4">
          <p className="text-gray-400 font-medium">
            Number of transaction: {numberOfTransactions}{' '}
          </p>
          <p className="text-gray-400 font-medium">Value: {totalValue}</p>
        </div>
      </div>
      {expense.length > 0 ? (
        expense.map((item) => {
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            };
            return new Intl.DateTimeFormat('en-GB', options).format(date);
          };

          const formatAmount = (amount) => {
            return parseFloat(amount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            });
          };

          const { icon, bgClass, textClass } = getRandomIconButton();
          return (
            <div
              key={item._id}
              onClick={() => openModal(item._id)}
              className="my-4">
              <div className="p-6 bg-white rounded-xl overflow-hidden drop-shadow-md transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <button
                    className={`flex items-center justify-center w-8 h-8 p-2 rounded-md overflow-hidden ${bgClass} ${textClass}`}>
                    {icon}
                  </button>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-black font-bold">{item.title}</h2>
                    <p className="text-gray-400 text-sm">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center space-x-12">
                    <h2 className="text-black font-black ">
                      {formatAmount(item.amount)}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex items-center justify-center w-6 h-6 rounded-md overflow-hidden bg-blue-100 text-blue-400 hover:bg-blue-400 hover:text-white">
                        <BookmarkIcon className="w-4 h-4 " />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                        className="flex items-center justify-center w-6 h-6 rounded-md overflow-hidden bg-red-100 text-red-400 hover:bg-red-400 hover:text-white">
                        <XMarkIcon className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No categories found.</p>
      )}

      <div className="flex justify-end items-center">
        <button className="flex items-center shadow-md justify-center p-1 w-10 h-10 rounded-3xl overflow-hidden bg-green-100 text-green-400 hover:bg-green-400 hover:text-white">
          <PlusIcon onClick={() => openModal()} className="w-6 h-6" />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        expense={editingExpense}
      />
    </div>
  );
};

export default ExpanseItem;
