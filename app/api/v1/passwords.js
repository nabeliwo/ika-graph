module.exports = connection => [
  {
    path: '/api/v1/passwords/',
    method: 'GET',
    handler: (request, reply) => {
      connection.query('SELECT password_id, password_key FROM passwords', (err, rows) => {
        if (err) {
          throw err;
        }

        return reply(rows);
      });
    }
  }
];
