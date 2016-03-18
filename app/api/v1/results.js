const path = '/api/v1/results/';

module.exports = connection => [
  {
    path: path,
    method: 'GET',
    handler: (request, reply) => {
      Promise.all([
        fetchBattles(connection),
        fetchKillRatios(connection),
        fetchPlayers(connection),
      ])
      .then(res => {
        const state = {
          battles: res[0],
          killRatios: res[1],
          players: res[2]
        };

        reply(state);
      })
      .catch(res => {
        reply(res);
      });
    }
  },
  {
    path: path,
    method: 'POST',
    handler: (request, reply) => {
      const payload = request.payload;
      const nabeId = 1;
      const sakuId = 2;
      const allyType = 0;
      const enemyType = 1;

      postBattle(payload, connection)
      .then(res => {
        const insertId = res.insertId;

        return Promise.all([
          postKillDeath(payload.killDeath.nabe, connection, insertId, nabeId),
          postKillDeath(payload.killDeath.saku, connection, insertId, sakuId),
          ...payload.player.ally.map(item => {
            return postPlayer(item, connection, insertId, allyType);
          }),
          ...payload.player.enemy.map(item => {
            return postPlayer(item, connection, insertId, enemyType);
          })
        ]);
      })
      .then(res => {
        return Promise.all([
          fetchBattles(connection),
          fetchKillRatios(connection),
          fetchPlayers(connection),
        ])
        .then(res => {
          const state = {
            battles: res[0],
            killRatios: res[1],
            players: res[2]
          };

          reply(state);
        })
      })
      .catch(res => {
        reply(res);
      });
    }
  }
];

function fetchBattles(connection) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT battle_id, result, stage_id, rule_id, record, current_udemae, change_num, battled_at FROM battles';

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

function fetchKillRatios(connection) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT battle_id, user_id, kill_num, death_num FROM kill_ratios';

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

function fetchPlayers(connection) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT battle_id, type, buki_id, udemae FROM players';

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

function postBattle(payload, connection) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO battles (result, rule_id, stage_id, record, current_udemae, change_num, battled_at) VALUES ("${payload.result}", "${payload.ruleId}", "${payload.stageId}", "${payload.record}", "${payload.currentUdemae}", "${payload.changeNum}", "${payload.date}")`;

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

function postKillDeath(killDeath, connection, insertId, userId) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO kill_ratios (battle_id, user_id, kill_num, death_num) VALUES ("${insertId}", "${userId}", "${killDeath.kill}", "${killDeath.death}")`;

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

function postPlayer(item, connection, insertId, playerType) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO players (battle_id, type, buki_id, udemae) VALUES ("${insertId}", "${playerType}", "${item.bukiId}", "${item.udemae}")`;

    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}
