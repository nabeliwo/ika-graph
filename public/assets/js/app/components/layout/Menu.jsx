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
    const { pages } = this.props;

    return (
      <div className="menu">
        <ul className="menu__list">
          {pages.list.map((page, i) => (
            <li key={i}><a className={`menu__link ${pages.current === page.url ? 'is-active' : ''}`} href={`#${page.url}`}>{page.name}</a></li>
          ))}
        </ul>
      </div>
    );
  }
}
