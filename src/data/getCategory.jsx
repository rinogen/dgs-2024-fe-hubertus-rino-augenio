import {
  BanknotesIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  HomeIcon,
  MinusIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

export const getCategory = (categoryName) => {
  switch (categoryName) {
    case 'Perabot Rumah':
      return {
        icon: <HomeIcon className="w-6 h-6 text-white" />,
        color: 'bg-blue-500',
      };
    case 'Makanan':
      return {
        icon: <ShoppingCartIcon className="w-6 h-6 text-white" />,
        color: 'bg-red-500',
      };
    case 'Tabungan':
      return {
        icon: <BuildingOffice2Icon className="w-6 h-6 text-white" />,
        color: 'bg-green-500',
      };
    case 'Home Expense':
      return {
        icon: <BanknotesIcon className="w-6 h-6 text-white" />,
        color: 'bg-yellow-500',
      };
    case 'Cryptocurrency':
      return {
        icon: <CurrencyDollarIcon className="w-6 h-6 text-white" />,
        color: 'bg-purple-500',
      };
    case 'Investasi Saham':
      return {
        icon: <PresentationChartLineIcon className="w-6 h-6 text-white" />,
        color: 'bg-orange-500',
      };
    default:
      return {
        icon: <MinusIcon className="w-6 h-6 text-white" />,
        color: 'bg-gray-500',
      };
  }
};
