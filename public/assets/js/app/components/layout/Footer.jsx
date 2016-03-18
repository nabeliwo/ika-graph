import * as React from 'react';
import { Component } from 'flumpt';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer__txt">v1.0.0 &copy; 2016 <a className="footer__txt__link" href="https://twitter.com/nabeliwo" target="_blank">@nabeliwo</a></p>
      </footer>
    );
  }
}
