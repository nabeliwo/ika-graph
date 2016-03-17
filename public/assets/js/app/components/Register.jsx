import * as React from 'react';
import { Component } from 'flumpt';

import Login from './register/Login';
import Form from './register/Form';

export default class Register extends Component {
  render() {
    const { stage, buki, register } = this.props;

    return (
      <div className="main__inner">
        <p className="c-title c-title--ika u-mb20">トウロク</p>

        <div className="p-register">
          {this.props.register.mode ? <Form stage={stage} buki={buki} /> : <Login register={register} />}
        </div>
      </div>
    );
  }
}
