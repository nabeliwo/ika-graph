import React from 'react';
import { render } from 'react-dom';

import pages from './state/pages';
import passwords from './state/passwords';
import stages from './state/stages';
import rules from './state/rules';
import bukis from './state/bukis';
import results from './state/results';

import App from './containers/App';

const app = new App({
  renderer: el => {
    render(el, document.getElementById('app'));
  },

  initialState: {
    pages: {},
    register: {},
    stages: [],
    rules: [],
    bukis: [],
    results: []
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
  passwords.fetch(),
  stages.fetch(),
  rules.fetch(),
  bukis.fetch(),
  results.fetch()
])
.then(res => {
  app.update(state => Object.assign({}, state, {
    pages: pages,
    register: res[0],
    stages: res[1],
    rules: res[2],
    bukis: res[3],
    results: res[4]
  }));
})
.catch(res => {
  console.log(res);
});
