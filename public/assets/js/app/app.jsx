import React from 'react';
import { render } from 'react-dom';

import pages from './state/pages';
import passwords from './state/passwords';
import stages from './state/stages';
import rules from './state/rules';
import bukis from './state/bukis';
import results from './state/results';
import bukiOthers from './state/bukiOthers';

import App from './containers/App';

const app = new App({
  renderer: el => {
    render(el, document.getElementById('app'));
  },

  initialState: {
    pages: pages,
    register: {},
    stages: [],
    rules: [],
    bukis: [],
    results: [],
    bukiOthers: [],
    request: {
      sending: false,
      status: null
    }
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
  results.fetch(),
  bukiOthers.fetch()
])
.then(res => {
  app.update(state => Object.assign({}, state, {
    register: res[0],
    stages: res[1],
    rules: res[2],
    bukis: res[3],
    results: res[4],
    bukiOthers: res[5]
  }));
})
.catch(res => {
  console.log(res);
});
