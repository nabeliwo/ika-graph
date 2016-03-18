module.exports = connection => [
  {
    path: '/api/v1/rules/',
    method: 'GET',
    handler: (request, reply) => {
      connection.query('SELECT rule_id, rule_name, thumbnail FROM rules', (err, rows) => {
        if (err) {
          throw err;
        }

        return reply(rows);
      });
    }
  }
];
