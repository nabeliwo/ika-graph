module.exports = connection => [
  {
    path: '/api/v1/bukiOthers/',
    method: 'GET',
    handler: (request, reply) => {
      connection.query('SELECT buki_other_id, buki_other_type, buki_other_name, thumbnail FROM buki_others', (err, rows) => {
        if (err) {
          throw err;
        }

        return reply(rows);
      });
    }
  }
];
