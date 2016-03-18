import * as React from 'react';
import { Component } from 'flumpt';

export default class WinPer extends Component {
  componentDidMount() {
    const winFill = 'rgba(220,220,220,0.5)';
    const winStroke = 'rgba(220,220,220,0.8)';
    const winFillHigh = 'rgba(220,220,220,0.75)';
    const winStrokeHigh = 'rgba(220,220,220,1)';
    const loseFill = 'rgba(151,187,205,0.5)';
    const loseStroke = 'rgba(151,187,205,0.8)';
    const loseFillHigh = 'rgba(151,187,205,0.75)';
    const loseStrokeHigh = 'rgba(151,187,205,1)';

    const canvases = document.getElementsByClassName('js-killRatio-canvas');
    const bars = [];

    Object.keys(canvases).forEach(function(key) {
      let canvas = this[key];

      bars.push(new Chart(canvas.getContext('2d')).Bar({
        labels: canvas.dataset.stage.split(','),
        datasets: [
          {
            label: "Win",
            fillColor: winFill,
            strokeColor: winStroke,
            highlightFill: winFillHigh,
            highlightStroke: winStrokeHigh,
            data: canvas.dataset.win.split(',')
          },
          {
            label: "Lose",
            fillColor: loseFill,
            strokeColor: loseStroke,
            highlightFill: loseFillHigh,
            highlightStroke: loseStrokeHigh,
            data: canvas.dataset.lose.split(',')
          }
        ]
      }));
    }, canvases);
  }

  getAllDataCanvas() {
    const { results } = this.props;
    const battleNum = results.length;
    const winNum = results.map(result => result.result).reduce((prev, current) => prev + current);
    const loseNum = battleNum - winNum;
    const winPer = Math.round(winNum / battleNum * 100);

    return (
      <div className="p-winper__canvas">
        <canvas className="js-killRatio-canvas" height="300" width="500" data-win={winNum} data-lose={loseNum} data-stage="オール"></canvas>
        <p className="p-winper__canvas__txt c-title--ika">{winPer}パーセント</p>
      </div>
    );
  }

  getCanvasPerRule(ruleId) {
    const { results, stages } = this.props;
    const resultArr = results.filter(result => result.rule_id === ruleId);
    const battleArr = stages.map(stage => {
      let battleNum = 0;
      let winNum = 0;

      resultArr.map(result => {
        if (result.stage_id === stage.stage_id) {
          battleNum++;
          winNum += result.result;
        }
      });

      return {
        battleNum: battleNum,
        winNum: winNum,
        loseNum: battleNum - winNum
      };
    });
    const winArr = battleArr.map(battle => battle.winNum);
    const loseArr = battleArr.map(battle => battle.loseNum);
    const stageArr = stages.map((stage, i) => {
      if (battleArr[i].battleNum !== 0) {
        let winPer = Math.round(battleArr[i].winNum / battleArr[i].battleNum * 100);
        return `${stage.stage_name}(${winPer}%)`;
      }

      return stage.stage_name;
    });

    return (
      <div className="p-winper__canvas is-table">
        <canvas className="js-killRatio-canvas" height="500" width="1200" data-win={winArr} data-lose={loseArr} data-stage={stageArr}></canvas>
      </div>
    );
  }

  render() {
    const { rules } = this.props;

    return (
      <div className="p-winper">
        <p className="c-title c-title--ika u-mb20">ショウリツ</p>

        <div className="u-mb30">
          {this.getAllDataCanvas()}
        </div>

        <table className="p-winper__table">
          <tbody>
            {rules.map((rule, i) =>
              <tr key={i}>
                <th key={i}>{rule.rule_name}</th>
                <td>
                  {this.getCanvasPerRule(rule.rule_id)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
