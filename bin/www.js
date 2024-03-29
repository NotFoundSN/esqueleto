/** Dependencias **/
const app = require('../app');
const debug = require('debug')('back:server');
const http = require('http');
const mqtt = require("mqtt")  // require mqtt
const mqttController = require('../controllers/mqttController');
/*const path = require('path')
const KEY = fs.readFileSync(path.join(__dirname, '/tls-key.pem'))
const CERT = fs.readFileSync(path.join(__dirname, '/tls-cert.pem'))
const TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, '/crt.ca.cg.pem'))*/

/** Obtiene puerto del entorno y lo setea **/
// mas opciones https://github.com/mqttjs/MQTT.js?tab=readme-ov-file#client
const optionsMQTT = {
  port: 0, //mqttPort
  host: 'host', //mqttHost
  /*key: KEY,
  cert: CERT,
  rejectUnauthorized: true,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,*/ //archivos de seguridad opcionales
  protocol: 'mqtts'
}
const port = normalizePort(process.env.PORT || '3000');
const client = mqtt.connect(optionsMQTT)  // create a client
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

/** MQTT LISTEN **/
client.subscribe('variable')
client.on('message', mqttController.readMQTT)