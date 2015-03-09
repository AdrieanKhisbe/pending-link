/** Pending Link */

var conf = require('./src/config/configuration.js');
var log = require('./src/config/logger')(conf);

var port = ~~process.env.PORT || conf.get("pl:port") ||  12121;
var server = require('./src/express')(port)
// §maybe: use nconf for the port

var MESSAGE = 'Pending Link in building, come back later !';
log.warn(MESSAGE);
server.loadGoodies(); // TODO: ask good thing?
server.start(function() {
    log.info("Listening on port " + port);
});
// TODO : extract server
