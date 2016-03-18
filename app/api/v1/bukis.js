module.exports = connection => [
  {
    path: '/api/v1/bukis/',
    method: 'GET',
    handler: (request, reply) => {
      connection.query('SELECT buki_id, buki_name, thumbnail, sub_id, special_id FROM bukis', (err, rows) => {
        if (err) {
          throw err;
        }

        return reply(rows);
      });
    }
  }
];
