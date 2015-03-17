/** Pending Link */

var options = require('./src/config/options').option_from(~~process.env.PORT);
var log = options.logger;

var server = require('./src/express')(options) ;
//var server = require('./src/hapi')(options)

var MESSAGE = 'Pending Link in building, come back later !';
log.warn(MESSAGE);
server.loadGoodies(); // TODO: ask good thing?
server.start(function() {
    log.info("Listening on port "+ options.port);
});
// TODO : extract server
