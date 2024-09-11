import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import '../sidebar.css';
import useAPI from '../../../hooks/useAPI';
import { getCategory } from '../../../data/getCategory';
import Modal from '../../modal/category/Modal';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Category = () => {
  const {
    data: response,
    loading,
    error,
    deleteData,
    fetchData,
    fetchDataById,
  } = useAPI('categories');
  const { data: responseExpense } = useAPI('expense-items');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const openModal = async (categoryId = null) => {
    if (categoryId) {
      try {
        const category = await fetchDataById(categoryId);
        console.log('Fetched category:', category); // Debugging
        setEditingCategory(category);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    } else {
      setEditingCategory(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    fetchData();
  };

  const categories = response?.data || [];
  const expenseItems = responseExpense?.data || [];

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this category!',
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
          text: 'Please wait while the category is being deleted.',
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

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-10 p-4">
      <div
        onClick={() => openModal()}
        className="flex justify-between items-center mb-8 space-x-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button className="flex items-center justify-center w-10 h-10 custom-dashed-border text-gray-400 hover:text-white hover:border-solid hover:bg-gray-400 transition-all duration-200 ease-in-out">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {categories.length > 0 ? (
        categories.map((category) => {
          const { icon, color } = getCategory(category.name);

          const totalOutcome = expenseItems
            .filter(
              (item) =>
                item.flowType === 'outcome' &&
                item.category._id === category._id // Match category id
            )
            .reduce((sum, item) => sum + item.amount, 0);

          const formatAmount = (amount) => {
            return parseFloat(amount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            });
          };

          return (
            <div
              onClick={() => openModal(category._id)}
              key={category._id}
              className="space-y-4">
              <div className="flex items-center space-x-4 transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                <button
                  className={`flex items-center justify-center w-10 h-10 p-2 rounded-md overflow-hidden border ${color}`}>
                  {icon}
                </button>
                <div className="flex flex-col flex-grow">
                  <h2 className="text-black font-bold">{category.name}</h2>
                  <p className="text-gray-400 text-sm">
                    {formatAmount(totalOutcome)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(category._id);
                  }}
                  className="flex items-center justify-center w-6 h-6 rounded-md overflow-hidden bg-red-100 text-red-400 hover:bg-red-400 hover:text-white">
                  <TrashIcon className="w-4 h-4 " />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No categories found.</p>
      )}
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        category={editingCategory}
      />
    </div>
  );
};

export default Category;
