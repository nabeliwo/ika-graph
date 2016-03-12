const Hapi = require('hapi');
const config = require('config');
const vision = require('vision');
const handlebars = require('handlebars');
const inert = require('inert');

const server = new Hapi.Server();

/**
 * Connect the server.
 */
server.connection({
  host: config.get('host'), // get configfile
  port: normalizePort(process.env.PORT || '3000')
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Template engine.
 */
server.register(vision, err => {
  if (err) {
    return console.dir(err);
  }

  server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: './public'
  });
});

/**
 * Serving static files and directories.
 */
server.register(inert, err => {
  if (err) {
    throw err;
  }
});

/**
 * Routing.
 */
const routings = [
  ...require('./app/routes')()
];

server.route(routings);

/**
 * Start the server.
 */
server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
