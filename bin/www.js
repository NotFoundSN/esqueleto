/** Dependencias **/
const app = require('../app');
const debug = require('debug')('back:server');
const http = require('http');

/** Obtiene puerto del entorno y lo setea **/
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/** crea sv http **/
const server = http.createServer(app);

/** Se queda escuchando llamadas al puerto **/
server.listen(port, () => {
  console.log('servidor corriendo en el puerto ' + port);
});
//server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/** Normalize a port into a number, string, or false **/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/** Event listener for HTTP server "error" event **/
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/** Event listener for HTTP server "listening" event **/
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}