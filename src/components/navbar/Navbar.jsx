import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between space-x-4">
          <div className="text-black text-xl font-semibold">Budget</div>
          <div className="p-2 bg-white rounded-lg shadow-md flex items-center space-x-2 flex-grow sm:w-52 md:w-64 lg:w-80">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <span className="text-gray-400 font-medium">Search</span>
          </div>
        </div>
        {/* Menu Items */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link to="/overview" className="text-black hover:text-gray-300">
              Overview
            </Link>
          </li>
          <li>
            <Link to="/finance" className="text-black hover:text-gray-300">
              Finance
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="text-black hover:text-gray-300">
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/events" className="text-black hover:text-gray-300">
              Events
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
