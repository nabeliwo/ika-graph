import * as React from 'react';
import { Component } from 'flumpt';

export default class KillRatio extends Component {
  render() {
    const { killRatios } = this.props;

    console.log(killRatios);
    return (
      <div className="main__inner">
        <p className="c-title c-title--ika u-mb20">キルレ</p>
      </div>
    );
  }
}
