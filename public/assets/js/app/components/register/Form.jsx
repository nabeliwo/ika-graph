import * as React from 'react';
import { Component } from 'flumpt';

import BattleDate from './form/BattleDate';

export default class Form extends Component {
  constructor() {
    super();
    this.udemaeList = ['C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S', 'S+'];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const elements = e.target.elements;
    const formData = {
      date: elements[0].value,
      result: elements[1].value,
      stageId: elements[2].value,
      ruleId: elements[3].value,
      record: elements[4].value.trim(),
      killDeath: {
        nabe: {
          kill: elements[5].value.trim(),
          death: elements[6].value.trim()
        },
        saku: {
          kill: elements[7].value.trim(),
          death: elements[8].value.trim()
        }
      },
      player: {
        ally: [
          {
            bukiId: elements[9].value,
            udemae: elements[10].value
          },
          {
            bukiId: elements[11].value,
            udemae: elements[12].value
          }
        ],
        enemy: [
          {
            bukiId: elements[13].value,
            udemae: elements[14].value
          },
          {
            bukiId: elements[15].value,
            udemae: elements[16].value
          },
          {
            bukiId: elements[17].value,
            udemae: elements[18].value
          },
          {
            bukiId: elements[19].value,
            udemae: elements[20].value
          }
        ]
      },
      changeNum: elements[21].value.trim(),
      currentUdemae: elements[22].value.trim()
    };

    if (formData.date === '') {
      alert('全て記入してください！');
      return;
    }

    this.dispatch('registerResults', formData);
  }

  render() {
    const { stages, rules, bukis } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <table className="p-register__form u-mb20">
          <tbody>
            <tr>
              <th className="c-title--ika">ヒヅケ</th>
              <td>
                <BattleDate />
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ショウハイ</th>
              <td>
                <select>
                  <option value="1">○</option>
                  <option value="0">●</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ステージ</th>
              <td>
                <select>
                  {stages.map((item, i) =>
                    <option key={i} value={item.stage_id}>{item.stage_name}</option>
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ルール</th>
              <td>
                <select>
                  {rules.map((item, i) =>
                    <option key={i} value={item.rule_id}>{item.rule_name}</option>
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">セイセキ</th>
              <td>
                <input className="c-input is-large" type="text" placeholder="ノックアウト or 〇〇：〇〇" required />
              </td>
            </tr>
            <tr>
              <th className="c-title--ika" rowSpan="2">キルデス</th>
              <td>
                <div className="u-dib u-mr10">ナベ =></div>
                <div className="u-dib u-mr10">
                  キル：<input className="c-input is-small" type="text" pattern="^[0-9]+$" required />
                </div>
                <div className="u-dib">
                  デス：<input className="c-input is-small" type="text" pattern="^[0-9]+$" required />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="u-dib u-mr10">サク =></div>
                <div className="u-dib u-mr10">
                  キル：<input className="c-input is-small" type="text" pattern="^[0-9]+$" required />
                </div>
                <div className="u-dib">
                  デス：<input className="c-input is-small" type="text" pattern="^[0-9]+$" required />
                </div>
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ミカタ</th>
              <td className="p-register__form__box">
                {[0, 1].map(i => (
                  <div key={i} className="p-register__form__box__cell">
                    <select className="p-register__form__box__cell__select u-mr5">
                      {bukis.map((item, i) =>
                        <option key={i} value={item.buki_id}>{item.buki_name}</option>
                      )}
                    </select>
                    <select className="p-register__form__box__cell__select">
                      {this.udemaeList.map((udemae, i) =>
                        <option key={i}>{udemae}</option>
                      )}
                    </select>
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">テキ</th>
              <td className="p-register__form__box">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="p-register__form__box__cell">
                    <select className="p-register__form__box__cell__select u-mr5">
                      {bukis.map((item, i) =>
                        <option key={i} value={item.buki_id}>{item.buki_name}</option>
                      )}
                    </select>
                    <select className="p-register__form__box__cell__select">
                      {this.udemaeList.map((udemae, i) =>
                        <option key={i}>{udemae}</option>
                      )}
                    </select>
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ヘンドウ</th>
              <td>
                <input className="c-input is-middle" type="text" placeholder="ex +20" required />
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">タイセンジ<br />ウデマエ</th>
              <td>
                <input className="c-input is-middle" type="text" placeholder="ex C-20" required />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="u-c">
          <input className="c-title--ika c-btn c-btn--default c-btn--middle" type="submit" value="ソウシン" />
        </div>
      </form>
    );
  }
}
