import * as React from 'react';
import { Component } from 'flumpt';
import moment from 'moment';

export default class Result extends Component {
  getItem(result, items, itemStr) {
    const itemId = itemStr + '_id';
    const itemName = itemStr + '_name';
    let name;

    items.map(item => {
      if (item[itemId] === result[itemId]) {
        name = item[itemName];
      }
    });

    return name;
  }

  render() {
    const { results, stages, rules, bukis } = this.props;

    return (
      <div className="p-result">
        <p className="c-title c-title--ika u-mb20">センセキ</p>

        <table className="p-result__table">
          <thead className="c-title--ika">
            <tr>
              <th rowSpan="2">カイスウ</th>
              <th rowSpan="2">ヒヅケ</th>
              <th rowSpan="2">ショウハイ</th>
              <th rowSpan="2">ステージ</th>
              <th rowSpan="2">ルール</th>
              <th rowSpan="2">セイセキ</th>
              <th colSpan="4">キルデス</th>
              <th rowSpan="2" colSpan="2">ミカタ</th>
              <th rowSpan="2" colSpan="2">テキ</th>
              <th rowSpan="2">ヘンドウ</th>
              <th rowSpan="2">タイセンジ<br />ウデマエ</th>
            </tr>
            <tr>
              <th colSpan="2">ナベ</th>
              <th colSpan="2">サク</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{moment(result.battled_at).format('YYYY/MM/DD')}</td>
                <td className={result.result ? 'is-win' : 'is-lose'}>{result.result ? '●' : '×'}</td>
                <td>{this.getItem(result, stages, 'stage')}</td>
                <td>{this.getItem(result, rules, 'rule')}</td>
                <td>{result.record}</td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">キル</p>
                    <p className="p-result__table__flex__cell">デス</p>
                  </div>
                </td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">{result.killRatios.nabe.kill_num}</p>
                    <p className="p-result__table__flex__cell">{result.killRatios.nabe.death_num}</p>
                  </div>
                </td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">キル</p>
                    <p className="p-result__table__flex__cell">デス</p>
                  </div>
                </td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">{result.killRatios.saku.kill_num}</p>
                    <p className="p-result__table__flex__cell">{result.killRatios.saku.death_num}</p>
                  </div>
                </td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">{this.getItem(result.players.ally[0], bukis, 'buki')}</p>
                    <p className="p-result__table__flex__cell">{this.getItem(result.players.ally[1], bukis, 'buki')}</p>
                  </div>
                </td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">{result.players.ally[0].udemae}</p>
                    <p className="p-result__table__flex__cell">{result.players.ally[1].udemae}</p>
                  </div>
                </td>
                <td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">{this.getItem(result.players.enemy[0], bukis, 'buki')}</p>
                    <p className="p-result__table__flex__cell">{this.getItem(result.players.enemy[1], bukis, 'buki')}</p>
                    <p className="p-result__table__flex__cell">{this.getItem(result.players.enemy[2], bukis, 'buki')}</p>
                    <p className="p-result__table__flex__cell">{this.getItem(result.players.enemy[3], bukis, 'buki')}</p>
                  </div>
                </td><td className="p-result__table__flex">
                  <div className="p-result__table__flex__inner">
                    <p className="p-result__table__flex__cell">{result.players.enemy[0].udemae}</p>
                    <p className="p-result__table__flex__cell">{result.players.enemy[1].udemae}</p>
                    <p className="p-result__table__flex__cell">{result.players.enemy[2].udemae}</p>
                    <p className="p-result__table__flex__cell">{result.players.enemy[3].udemae}</p>
                  </div>
                </td>
                <td>{result.change_num}</td>
                <td>{result.current_udemae}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
