import { Bars3Icon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { filter } from '../../data/getFilter';

const Filter = () => {
  return (
    <div className="mt-6 pt-4">
      <div className="mt-4">
        <div className="flex justify-between items-center space-x-2">
          <div className="flex items-center space-x-2 w-full">
            {filter.map((item) => (
              <button
                key={item.id}
                className={`flex items-center p-2 justify-between w-full h-auto rounded-md overflow-hidden space-x-2 
          ${
            item.name === 'Dates' ? 'bg-blue-100' : 'border border-gray-300 '
          }`}>
                <h2
                  className={`font-medium ${
                    item.name === 'Dates' ? 'text-blue-400' : 'text-gray-400'
                  }`}>
                  {item.name}
                </h2>
                <ChevronUpDownIcon
                  className={`w-4 h-4 ${
                    item.name === 'Dates' ? 'text-blue-400' : 'text-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
          <button className="flex items-center p-2 justify-between w-auto h-auto rounded-md overflow-hidden space-x-2 border border-gray-300 ">
            <Bars3Icon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
