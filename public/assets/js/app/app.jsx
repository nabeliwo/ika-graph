import React from 'react';
import { render } from 'react-dom';

import page from './state/page';
import password from './state/password';
import stage from './state/stage';
import buki from './state/buki';

import App from './containers/App';

const app = new App({
  renderer: el => {
    render(el, document.getElementById('app'));
  },

  initialState: {
    page: {},
    register: {},
    stage: [],
    buki: []
  },

  middlewares: [
    // logger
    state => {
      console.log('-----logger start-----');
      console.log(state);
      console.log('-----logger end-----');
      return state;
    }
  ]
});

Promise.all([
  password.fetch(),
  stage.fetch(),
  buki.fetch()
])
.then(res => {
  app.update(state => Object.assign({}, state, {
    page: page,
    register: res[0],
    stage: res[1],
    buki: res[2]
  }));
})
.catch(res => {
  console.log(res);
});
