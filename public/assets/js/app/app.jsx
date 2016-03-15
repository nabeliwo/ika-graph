import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';

const app = new App({
  renderer: el => {
    render(el, document.getElementById('app'));
  },

  initialState: {
    memo: 'piyo'
  },

  middlewares: [
    // logger
    state => {
      console.log(state);
      return state;
    }
  ]
});

app.update(state => state);
