const path = '/api/v1/results/';

module.exports = connection => [
  {
    path: path,
    method: 'GET',
    handler: (request, reply) => {

      // connection.query('SELECT buki_id, buki_name, thumbnail FROM bukis', (err, rows) => {
      //   if (err) {
      //     throw err;
      //   }
      //
      //   return reply(rows);
      // });
      return reply([]);
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
        console.log(res);
      })
      .catch(res => {
        reply(res);
      });
    }
  }
];

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
