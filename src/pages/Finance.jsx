import ExpanseItem from '../components/finance/ExpanseItem';
import Layout from '../components/layout/Layout';
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo/wallet-icon.png';
import Filter from '../components/finance/Filter';

const Finance = () => {
  return (
    <>
      <Layout>
        <div className="my-6 p-4">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 rounded-md overflow-hidden ">
                <img
                  src={logo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              <div className="flex flex-col">
                <h1 className="text-blue-500 font-bold text-xl ">
                  Home Wallet
                </h1>
                <p className="text-gray-400 text-sm">change default wallet</p>
              </div>
            </div>
            <div className="p-2  bg-white rounded-lg shadow-md flex items-center justify-between space-x-2">
              <CalendarIcon className="w-6 h-6 text-gray-400" />
              <span className="text-gray-400 font-medium">Calendar</span>
              <ChevronDownIcon className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <Filter />
          <ExpanseItem />
        </div>
      </Layout>
    </>
  );
};

export default Finance;
