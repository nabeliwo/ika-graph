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
      date: elements[0].dataset.date,
      result: elements[1].value,
      stageId: elements[2].value,
      record: elements[3].value.trim(),
      killDeath: {
        nabe: {
          kill: elements[4].value.trim(),
          death: elements[5].value.trim()
        },
        saku: {
          kill: elements[6].value.trim(),
          death: elements[7].value.trim()
        }
      },
      player: {
        ally: [
          {
            buki_id: elements[8].value,
            udemae: elements[9].value
          },
          {
            buki_id: elements[10].value,
            udemae: elements[11].value
          }
        ],
        enemy: [
          {
            buki_id: elements[12].value,
            udemae: elements[13].value
          },
          {
            buki_id: elements[14].value,
            udemae: elements[15].value
          },
          {
            buki_id: elements[16].value,
            udemae: elements[17].value
          },
          {
            buki_id: elements[18].value,
            udemae: elements[19].value
          }
        ]
      },
      changeNum: elements[20].value.trim(),
      currentUdemae: elements[21].value.trim()
    };

    if (formData.date === '') {
      alert('全て記入してください！');
      return;
    }

    this.dispatch('registerResults', formData);
  }

  render() {
    const { stage, buki } = this.props;

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
                  <option value="true">○</option>
                  <option value="false">●</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ステージ</th>
              <td>
                <select>
                  {stage.map((item, i) =>
                    <option key={i} value={item.stage_id}>{item.stage_name}</option>
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
                  キル：<input className="c-input is-small" type="text" required />
                </div>
                <div className="u-dib">
                  デス：<input className="c-input is-small" type="text" required />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="u-dib u-mr10">サク =></div>
                <div className="u-dib u-mr10">
                  キル：<input className="c-input is-small" type="text" required />
                </div>
                <div className="u-dib">
                  デス：<input className="c-input is-small" type="text" required />
                </div>
              </td>
            </tr>
            <tr>
              <th className="c-title--ika">ミカタ</th>
              <td className="p-register__form__box">
                {[0, 1].map(i => (
                  <div key={i} className="p-register__form__box__cell">
                    <select className="p-register__form__box__cell__select u-mr5">
                      {buki.map((item, i) =>
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
                      {buki.map((item, i) =>
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
