import * as React from "react";
import { Component } from "flumpt";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__logo"><img className="u-fulimg" src="/assets/img/common/logo.png" /></div>
      </header>
    );
  }
}
