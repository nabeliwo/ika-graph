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
          },
          request: {
            sending: state.request.sending,
            status: null
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
      this.update(state => {
        return Object.assign({}, state, {
          request: {
            sending: true,
            status: null
          }
        });
      });

      results.post(formData)
      .then(res => {
        this.update(state => {
          return Object.assign({}, state, {
            results: res,
            request: {
              sending: false,
              status: true
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
        this.update(state => {
          return Object.assign({}, state, {
            request: {
              sending: false,
              status: false
            }
          });
        });
      });
    });
  }

  renderPage(state) {
    const { pages, results, stages, rules, bukis, register, request, bukiOthers } = state;

    switch (pages.current) {
      case '/':
        return <Index />;
        break;

      case '/result/':
        return <Result results={results} stages={stages} rules={rules} bukis={bukis} />;
        break;

      case '/kill_ratio/':
        return <KillRatio results={results} stages={stages} rules={rules} />;
        break;

      case '/win_per/':
        return <WinPer results={results} stages={stages} rules={rules} />;
        break;

      case '/weapon/':
        return <Weapon results={results} bukis={bukis} bukiOthers={bukiOthers} />;
        break;

      case '/register/':
        return <Register stages={stages} rules={rules} bukis={bukis} register={register} request={request} />;
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
