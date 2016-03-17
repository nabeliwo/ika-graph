import * as React from 'react';
import { Component } from 'flumpt';

export default class Login extends Component {
  constructor() {
    super();
    this.handleSubmitPass = this.handleSubmitPass.bind(this);
  }

  handleSubmitPass(e) {
    e.preventDefault();

    const input = e.target.pass;
    const register = this.props.register;
    const value = input.value;

    if (register.pass.some(item => item.password_key === value)) {
      input.value = '';
      input.blur();
      this.dispatch('changeRegisterMode', {
        mode: true,
        password: value
      });
    } else {
      alert('パスワードが違います！');
    }
  }

  render() {
    return (
      <div className="p-register__login">
        <p className="u-mb20">センセキをトウロクするにはパスワードが必要です！</p>
        <div>
          パスワード：
          <form className="p-register__login__form" onSubmit={this.handleSubmitPass}>
            <input className="p-register__login__form__input" type="password" id="pass" placeholder="くコ:彡" autoComplete="off" />
            <input className="p-register__login__form__submit" type="submit" value="ソウシン" />
          </form>
        </div>
      </div>
    );
  }
}
