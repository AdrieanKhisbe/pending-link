// Pending Link

var log = require('bunyan').createLogger({name: 'pending-link'});

var Hapi = require('hapi');
var port = ~~process.env.PORT || 12121;

var server = new Hapi.Server();
server.connection({ port: port });

server.route(require('./src/config/routes'));

var MESSAGE = 'Pending Link in building, come back later !';
log.warn(MESSAGE);
server.start(function() {
    log.info("Listening on port " + port);
});
// TODO : extract server