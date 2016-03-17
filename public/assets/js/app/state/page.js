const page =  {
  current: location.hash.substr(1) || '/',
  list: [
    {
      name: 'トップ',
      url: '/'
    },
    {
      name: 'センセキ',
      url: '/result/'
    },
    {
      name: 'キルレ',
      url: '/kill_ratio/'
    },
    {
      name: 'ショウリツ',
      url: '/win_per/'
    },
    {
      name: 'ブキ',
      url: '/weapon/'
    },
    {
      name: 'トウロク',
      url: '/register/'
    }
  ]
};

export default page;
