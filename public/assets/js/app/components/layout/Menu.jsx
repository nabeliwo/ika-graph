import * as React from 'react';
import { Component } from 'flumpt';

export default class Menu extends Component {
  componentWillMount() {
    window.addEventListener('hashchange', () => {
      const current = location.hash.substr(1);
      this.dispatch('changePage', { current });
    }, false);
  }

  render() {
    const page = this.props.page;

    return (
      <div className="menu">
        <ul className="menu__list">
          {page.list.map((item, i) => (
            <li key={i}><a className={`menu__link ${page.current === item.url ? 'is-active' : ''}`} href={`#${item.url}`}>{item.name}</a></li>
          ))}
        </ul>
      </div>
    );
  }
}
