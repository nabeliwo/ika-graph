module.exports = connection => [
  {
    path: '/api/v1/stages/',
    method: 'GET',
    handler: (request, reply) => {
      connection.query('SELECT stage_id, stage_name, thumbnail FROM stages', (err, rows) => {
        if (err) {
          throw err;
        }

        return reply(rows);
      });
    }
  }
];
