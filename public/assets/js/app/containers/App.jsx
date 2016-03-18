import * as React from 'react';
import { Flux } from 'flumpt';

import Menu from '../components/layout/Menu';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import Index from '../components/Index';
import Result from '../components/Result';
import KillRatio from '../components/KillRatio';
import WinPer from '../components/WinPer';
import Weapon from '../components/Weapon';
import Register from '../components/Register';

import results from '../state/results';

export default class App extends Flux {
  subscribe() {
    this.on('changePage', page => {
      this.update(state => {
        return Object.assign({}, state, {
          pages: {
            current: page.current,
            list: state.pages.list
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

    this.on('registerResults', formData => {
      results.post(formData)
      .then(res => {
        console.log(res);
        this.update(state => state);
      });
    });
  }

  renderPage(state) {
    const { pages, stages, rules, bukis, register } = state;

    switch (pages.current) {
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
        return <Register stages={stages} rules={rules} bukis={bukis} register={register} />;
        break;
    }
  }

  render(state: {}) {
    return (
      <div>
        <Menu pages={state.pages} />
        <Header />

        <div className="main">
          {this.renderPage(state)}
        </div>

        <Footer />
      </div>
    );
  }
}
