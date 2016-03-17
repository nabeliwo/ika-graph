import * as React from 'react';
import { Component } from 'flumpt';

export default class Index extends Component {
  render() {
    return (
      <div className="main__inner">
        <div className="p-index">
          <p>
            <span className="p-index__large c-title--ika">イカグラフ</span>とは<br />
            <span className="p-index__large p-index__nabe c-title--ika">ナベ</span>と<span className="p-index__large p-index__saku c-title--ika">サクモト</span>による<br />
            <span className="p-index__large c-title--ika">スプラトゥーンじっきょう</span><br />
            における目標である<br />
            「タッグマッチでA+99目指す」<br />
            を達成する為に作られた<br />
            戦績を記録し、可視化し、分析する<br />
            ツールである<br />
            <span className="p-index__large c-title--ika">イカ、よろしくーーー！</span>
          </p>
        </div>
      </div>
    );
  }
}
