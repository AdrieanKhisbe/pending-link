// Pending Link

var port = ~~process.env.PORT || 12121;
var server = require('./src/server')(port)

var log = require('bunyan').createLogger({name: 'pending-link'});

var MESSAGE = 'Pending Link in building, come back later !';
log.warn(MESSAGE);
server.start(function() {
    log.info("Listening on port " + port);
});
// TODO : extract server