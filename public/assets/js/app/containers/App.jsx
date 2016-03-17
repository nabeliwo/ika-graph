import * as React from 'react';
import { Flux } from 'flumpt';

import registerResults from '../action/registerResults';

import Menu from '../components/layout/Menu';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import Index from '../components/Index';
import Result from '../components/Result';
import KillRatio from '../components/KillRatio';
import WinPer from '../components/WinPer';
import Weapon from '../components/Weapon';
import Register from '../components/Register';

export default class App extends Flux {
  subscribe() {
    this.on('changePage', page => {
      this.update(state => {
        return Object.assign({}, state, {
          page: {
            current: page.current,
            list: state.page.list
          }
        });
      });
    });

    this.on('changeRegisterMode', register => {
      document.cookie = 'password=' + register.password;

      this.update(state => {
        return Object.assign({}, state, {
          register: {
            mode: register.mode,
            pass: state.register.pass
          }
        });
      });
    });

    this.on('registerResults', registerResults);
  }

  renderPage(state) {
    const { page, stage, buki, register } = state;

    switch (page.current) {
      case '/':
        return <Index />;
        break;

      case '/result/':
        return <Result />;
        break;

      case '/kill_ratio/':
        return <KillRatio />;
        break;

      case '/win_per/':
        return <WinPer />;
        break;

      case '/weapon/':
        return <Weapon />;
        break;

      case '/register/':
        return <Register stage={stage} buki={buki} register={register} />;
        break;
    }
  }

  render(state: {}) {
    return (
      <div>
        <Menu page={state.page} />
        <Header />

        <div className="main">
          {this.renderPage(state)}
        </div>

        <Footer />
      </div>
    );
  }
}
