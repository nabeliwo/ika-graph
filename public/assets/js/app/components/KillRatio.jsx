import * as React from 'react';
import { Component } from 'flumpt';

export default class KillRatio extends Component {
  componentDidMount() {
    const killColor = '#aaf2fb';
    const deathColor = '#ffb6b9';
    const canvases = document.getElementsByClassName('js-killRatio-canvas');
    const doughnuts = [];

    Object.keys(canvases).forEach(function(key) {
      let canvas = this[key];

      doughnuts.push(new Chart(canvas.getContext('2d')).Doughnut([
        {
          value: canvas.dataset.kill,
          color: killColor
        },
        {
          value: canvas.dataset.death,
          color: deathColor
        }
      ]));
    }, canvases);
  }

  getAllDataCanvas() {
    const { results } = this.props;
    const _pow = Math.pow(10, 2);
    const nabeKill = results.map(result => result.killRatios.nabe.kill_num).reduce((prev, current) => prev + current);
    const nabeDeath = results.map(result => result.killRatios.nabe.death_num).reduce((prev, current) => prev + current);
    const nabeRatio = Math.round(nabeKill / nabeDeath * _pow) / _pow;
    const sakuKill = results.map(result => result.killRatios.saku.kill_num).reduce((prev, current) => prev + current);
    const sakuDeath = results.map(result => result.killRatios.saku.death_num).reduce((prev, current) => prev + current);
    const sakuRatio = Math.round(sakuKill / sakuDeath * _pow) / _pow;
    const concatKill = nabeKill + sakuKill;
    const concatDeath = nabeDeath + sakuDeath;
    const concatRatio = Math.round(concatKill / concatDeath * _pow) / _pow;

    return (
      <div>
        <div className="p-killRatio__canvas">
          <canvas className="js-killRatio-canvas" height="250" width="250" data-kill={concatKill} data-death={concatDeath}></canvas>
          <p className="p-killRatio__canvas__txt c-title--ika">オール<br />{concatRatio || ''}</p>
        </div>
        <div className="p-killRatio__canvas">
          <canvas className="js-killRatio-canvas" height="250" width="250" data-kill={nabeKill} data-death={nabeDeath}></canvas>
          <p className="p-killRatio__canvas__txt c-title--ika">ナベ<br />{nabeRatio || ''}</p>
        </div>
        <div className="p-killRatio__canvas">
          <canvas className="js-killRatio-canvas" height="250" width="250" data-kill={sakuKill} data-death={sakuDeath}></canvas>
          <p className="p-killRatio__canvas__txt c-title--ika">サク<br />{sakuRatio || ''}</p>
        </div>
      </div>
    );
  }

  getCanvas(stageId, ruleId) {
    const { results } = this.props;
    let killRatio;

    for (var i = 0, l = results.length; i < l; i++) {
      if (results[i].stage_id === stageId && results[i].rule_id === ruleId) {
        killRatio =  results[i].killRatios;
      }
    }

    if (!killRatio) {
      return null;
    }

    const _pow = Math.pow(10, 2);
    const nabeKill = killRatio.nabe.kill_num;
    const nabeDeath = killRatio.nabe.death_num;
    const nabeRatio = Math.round(nabeKill / nabeDeath * _pow) / _pow;
    const sakuKill = killRatio.saku.kill_num;
    const sakuDeath = killRatio.saku.death_num;
    const sakuRatio = Math.round(sakuKill / sakuDeath * _pow) / _pow;

    return (
      <div>
        <div className={`p-killRatio__canvas is-small ${nabeRatio ? '' : 'is-brNone'}`}>
          <canvas className="js-killRatio-canvas" width="100" height="100" data-kill={nabeKill} data-death={nabeDeath}></canvas>
          <p className="p-killRatio__canvas__txt c-title--ika">ナベ<br />{nabeRatio || ''}</p>
        </div>
        <div className={`p-killRatio__canvas is-small ${nabeRatio ? '' : 'is-brNone'}`}>
          <canvas className="js-killRatio-canvas" width="100" height="100" data-kill={sakuKill} data-death={sakuDeath}></canvas>
          <p className="p-killRatio__canvas__txt c-title--ika">サク<br />{sakuRatio || ''}</p>
        </div>
      </div>
    );
  }

  render() {
    const { stages, rules } = this.props;

    return (
      <div className="p-killRatio">
        <p className="c-title c-title--ika u-mb30">キルレ</p>

        <div className="u-c">
          <div className="u-mb30">
            <p className="p-killRatio__color is-death">デス：</p>
            <p className="p-killRatio__color is-kill">キル：</p>
          </div>

          <div className="u-mb30">
            {this.getAllDataCanvas()}
          </div>

          <table className="p-killRatio__table">
            <thead>
              <tr>
                <th></th>
                {rules.map((rule, i) =>
                  <th key={i}>{rule.rule_name}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {stages.map((stage, i) =>
                <tr key={i}>
                  <th>{stage.stage_name}</th>
                  {rules.map((rule, i) =>
                    <td key={i}>{this.getCanvas(stage.stage_id, rule.rule_id)}</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
