import {
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  BookmarkIcon,
  HomeIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon,
  InformationCircleIcon,
  KeyIcon,
  LightBulbIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const colorPairs = [
  { bgClass: 'bg-red-100', textClass: 'text-red-400' },
  { bgClass: 'bg-green-100', textClass: 'text-green-400' },
  { bgClass: 'bg-blue-100', textClass: 'text-blue-400' },
  { bgClass: 'bg-yellow-100', textClass: 'text-yellow-400' },
  { bgClass: 'bg-purple-100', textClass: 'text-purple-400' },
  { bgClass: 'bg-pink-100', textClass: 'text-pink-400' },
  { bgClass: 'bg-indigo-100', textClass: 'text-indigo-400' },
  { bgClass: 'bg-gray-100', textClass: 'text-gray-400' },
  { bgClass: 'bg-orange-100', textClass: 'text-orange-400' },
  { bgClass: 'bg-teal-100', textClass: 'text-teal-400' },
  { bgClass: 'bg-cyan-100', textClass: 'text-cyan-400' },
  { bgClass: 'bg-lime-100', textClass: 'text-lime-400' },
  { bgClass: 'bg-amber-100', textClass: 'text-amber-400' },
  { bgClass: 'bg-emerald-100', textClass: 'text-emerald-400' },
  { bgClass: 'bg-violet-100', textClass: 'text-violet-400' },
  { bgClass: 'bg-fuchsia-100', textClass: 'text-fuchsia-400' },
  { bgClass: 'bg-rose-100', textClass: 'text-rose-400' },
];

export const icons = [
  { icon: <MinusIcon className="w-8 h-8" />, key: 'minus' },
  { icon: <PlusIcon className="w-8 h-8" />, key: 'plus' },
  { icon: <XMarkIcon className="w-8 h-8" />, key: 'xmark' },
  { icon: <BookmarkIcon className="w-8 h-8" />, key: 'bookmark' },
  { icon: <HomeIcon className="w-8 h-8" />, key: 'home' },
  { icon: <BellIcon className="w-8 h-8" />, key: 'bell' },
  { icon: <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />, key: 'chat' },
  { icon: <EnvelopeIcon className="w-8 h-8" />, key: 'envelope' },
  { icon: <GlobeAltIcon className="w-8 h-8" />, key: 'globe' },
  { icon: <HeartIcon className="w-8 h-8" />, key: 'heart' },
  { icon: <InformationCircleIcon className="w-8 h-8" />, key: 'info' },
  { icon: <KeyIcon className="w-8 h-8" />, key: 'key' },
  { icon: <LightBulbIcon className="w-8 h-8" />, key: 'lightbulb' },
  { icon: <LockClosedIcon className="w-8 h-8" />, key: 'lock' },
  { icon: <MagnifyingGlassIcon className="w-8 h-8" />, key: 'search' },
  { icon: <PencilSquareIcon className="w-8 h-8" />, key: 'edit' },
  { icon: <ShoppingCartIcon className="w-8 h-8" />, key: 'cart' },
  { icon: <UserCircleIcon className="w-8 h-8" />, key: 'user' },
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function getRandomIconButton() {
  const randomColorPair = getRandomItem(colorPairs);
  const randomIcon = getRandomItem(icons);

  return {
    icon: randomIcon.icon,
    bgClass: randomColorPair.bgClass,
    textClass: randomColorPair.textClass,
  };
}
