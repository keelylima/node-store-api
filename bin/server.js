'use scrict'

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server'); //esse nodestr:server é um nome que eu to dando (?)

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log('sua API ta na porta ' + port + ' bb');
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0)  {
        return port;
    }

    return false;
}

function onListening() {
    const addr = server.address();
    const bind  = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on' + bind);
}