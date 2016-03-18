import * as React from 'react';
import { Component } from 'flumpt';

export default class Weapon extends Component {
  getBukiCloud() {
    const { results } = this.props;
    const allyIdArr = []
    const enemyIdArr = [];

    results.map(result => {
      result.players.ally.map(player => {
        allyIdArr.push(player.buki_id);
      });

      result.players.enemy.map(player => {
        enemyIdArr.push(player.buki_id);
      });
    });

    const bukiArr = [
      ...this._getBukiArr(allyIdArr),
      ...this._getBukiArr(enemyIdArr)
    ];
    const noDuplicatedBukiArr = [];

    // だぶってるものを排除してだぶってた数分sizeを増やす
    bukiArr.map(buki => {
      let flag = false;

      noDuplicatedBukiArr.map(item => {
        if (item.id === buki.id) {
          flag = true;
          item.size++;
        }
      });

      if (!flag) {
        noDuplicatedBukiArr.push(buki);
      }
    });

    // 降順にソート
    noDuplicatedBukiArr.sort((a, b) => {
      if (a.size > b.size) return -1;
      if (a.size < b.size) return 1;
      return 0;
    });

    // 一つずつ取り出して二つにわける
    const evenArr = noDuplicatedBukiArr.filter((item, i) => i % 2 === 1);
    const oddArr = noDuplicatedBukiArr.filter((item, i) => i % 2 === 0);

    // 片方を逆順にして結合することで中心がもっともsizeが大きくなる
    const optimizedBukiArr = [
      ...evenArr.reverse(),
      ...oddArr
    ];

    // 全てのブキにランダムで色をつける
    const coloredBukiArr = optimizedBukiArr.map(buki => {
      return Object.assign({}, buki, {
        color: this._getRandomColor()
      });
    });

    return coloredBukiArr;
  }

  _getBukiArr(bukiIdArr) {
    const { bukis } = this.props;

    return bukiIdArr.map(id => {
      let name;

      for (var i = 0, l = bukis.length; i < l; i++) {
        if (bukis[i].buki_id === id) {
          name = bukis[i].buki_name;
        }
      }

      return {
        id: id,
        name: name,
        size: 0
      };
    });
  }

  _getRandomColor() {
    const colorArr = ['#ef4a1d', '#0e2ef2', '#b5fc36', '#c521e2', '#ec1d99', '#2decc0'];
    const colorLen = colorArr.length - 1;
    const randomNum = Math.floor(Math.random() * (colorLen + 1));

    return colorArr[randomNum];
  }

  getBukiSet() {
    const { bukis, bukiOthers } = this.props;
    const bukiSets = bukis.map(buki => {
      const sub = bukiOthers.filter(item => item.buki_other_id === buki.sub_id)[0];
      const special = bukiOthers.filter(item => item.buki_other_id === buki.special_id)[0];

      return Object.assign({}, buki, {
        sub: sub,
        special: special
      });
    });

    return bukiSets;
  }

  render() {
    return (
      <div className="p-weapon">
        <p className="c-title c-title--ika u-mb20">ブキ</p>

        <div className="p-weapon__cloud c-title--ika">
          <p className="p-weapon__cloud__title">ブキブンプ</p>

          {this.getBukiCloud().map((item, i) =>
            <p className="p-weapon__cloud__txt" style={{color:item.color, fontSize: 16 + item.size + 'px'}} key={i}>{item.name}</p>
          )}
        </div>

        <div className="p-weapon__inner c-title--ika">
          <p className="c-title u-mb20">ブキイチラン</p>
          <table className="p-weapon__table">
            <thead>
              <tr>
                <th>ナマエ</th>
                <th>サブ</th>
                <th>スペシャル</th>
              </tr>
            </thead>
            <tbody>
              {this.getBukiSet().map((buki, i) =>
                <tr key={i}>
                  <td>
                    <div className="p-weapon__table__thumb"><img className="u-fulimg" src={`/assets/img/${buki.thumbnail}`} width="100%" height="auto" /></div>
                    {buki.buki_name}
                  </td>
                  <td>
                    <div className="p-weapon__table__thumb"><img className="u-fulimg" src={`/assets/img/${buki.sub.thumbnail}`} width="100%" height="auto" /></div>
                    {buki.sub.buki_other_name}
                  </td>
                  <td>
                    <div className="p-weapon__table__thumb"><img className="u-fulimg" src={`/assets/img/${buki.special.thumbnail}`} width="100%" height="auto" /></div>
                    {buki.special.buki_other_name}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
