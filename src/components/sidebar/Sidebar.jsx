import { BellIcon } from '@heroicons/react/24/outline';
import './sidebar.css';
import Category from './category/Category';
import Wallet from './wallet/Wallet';

const Sidebar = () => {
  return (
    <div className="w-72 bg-white text-black h-screen fixed right-0 top-0 border-l border-gray-200 flex flex-col">
      {/* Top Section: Logo, Account, Notifications */}
      <div className="flex justify-end items-center mb-4 space-x-4 p-4">
        <button className="text-gray-600 hover:text-gray-900">
          <BellIcon className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-md overflow-hidden ">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725926400&semt=ais_hybrid"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <Wallet />
        <hr className="my-4 border-gray-300" />
        <Category />
      </div>
    </div>
  );
};

export default Sidebar;
