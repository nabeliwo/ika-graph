import axios from 'axios';

const url = '/api/v1/results/';
const results = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        timeout: 10000,
        method: 'GET',
        responseType: 'json'
      })
      .then(res => {
        const state = concatBattleData(res.data);

        resolve(state);
      })
      .catch(err => {
        reject();
      });
    });
  },
  post: formData => {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        timeout: 10000,
        method: 'POST',
        responseType: 'json',
        data: formData
      })
      .then(res => {
        const state = concatBattleData(res.data);

        resolve(state);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
};

function concatBattleData(data) {
  const { battles, killRatios, players } = data;

  return battles.map(battle => {
    battle.killRatios = {};
    battle.killRatios.nabe = killRatios.filter(killRatio => killRatio.battle_id === battle.battle_id && killRatio.user_id === 1)[0];
    battle.killRatios.saku = killRatios.filter(killRatio => killRatio.battle_id === battle.battle_id && killRatio.user_id === 2)[0];

    battle.players = {};
    battle.players.ally = players.filter(player => player.battle_id === battle.battle_id && player.type === 0);
    battle.players.enemy = players.filter(player => player.battle_id === battle.battle_id && player.type === 1);

    return battle;
  });
}

export default results;
