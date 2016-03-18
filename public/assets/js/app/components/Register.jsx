import * as React from 'react';
import { Component } from 'flumpt';

import Login from './register/Login';
import Form from './register/Form';

export default class Register extends Component {
  render() {
    const { stages, rules, bukis, register, request } = this.props;

    return (
      <div className="main__inner">
        <p className="c-title c-title--ika u-mb20">トウロク</p>

        <div className="p-register">
          {this.props.register.mode ? <Form stages={stages} rules={rules} bukis={bukis} request={request} /> : <Login register={register} />}
        </div>
      </div>
    );
  }
}
