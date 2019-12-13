
// export const initialState = {
//   currentPaperId: 0,
//   articles: {},
//   searchResults: {}
// };

export const initialState = {
  currentPaperId: 0,
  articles: {
    1: {
      id: 1,
      coreId: '82212740',
      title: 'Cats',
      year: 2004,
      downloadUrl: 'https://core.ac.uk/download/pdf/82212740.pdf',
      author: 'O\'Brien, Stephen J.'
    },
    2: {
      id: 2,
      coreId: '10200893',
      title: 'Of feral cats and pet cats',
      year: 2012,
      downloadUrl: 'https://core.ac.uk/download/pdf/10200893.pdf',
      author: 'Vojak, Bruce A.'
    }
  },
  searchResults: {
    1: {
      id: 1,
      coreId: '82212740',
      title: 'Cats',
      year: 2004,
      downloadUrl: 'https://core.ac.uk/download/pdf/82212740.pdf',
      author: 'O\'Brien, Stephen J.'
    },
    2: {
      id: 2,
      coreId: '10200893',
      title: 'Of feral cats and pet cats',
      year: 2012,
      downloadUrl: 'https://core.ac.uk/download/pdf/10200893.pdf',
      author: 'Vojak, Bruce A.'
    }
  }
};