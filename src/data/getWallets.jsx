export const getWallets = (walletName) => {
  switch (walletName) {
    case 'OVO':
      return {
        src: 'https://pbs.twimg.com/media/EUbePLEU0AIpder.jpg',
      };

    case 'GOPAY':
      return {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVQjgSCE39k1viQ0hz8yPNI97n5xtypn8Rg&s',
      };

    case 'ShopeePay':
      return {
        src: 'https://pbs.twimg.com/profile_images/1818891557900369923/fwvEQAJT_400x400.jpg',
      };

    case 'LinkAja':
      return {
        src: 'https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg',
      };

    case 'DANA':
      return {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2_xIL8Re6O9RPNVvvnZZ1fpANOtH-wFCYw&s',
      };

    default:
      return {
        src: 'https://via.placeholder.com/32',
      };
  }
};
