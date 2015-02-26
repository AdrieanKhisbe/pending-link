// Pending Link
/* Premier Serveur */

var http = require('http');

var log = require('bunyan').createLogger({name: 'pending-link'});
var MESSAGE = 'Pending Link in building, come back later !';

var server = http.createServer(function(req,rep) {
    rep.writeHead(200);
    rep.end(MESSAGE);
});

log.warn(MESSAGE);
var port = process.env.PORT || 12121;
server.listen(port);
log.info("Listening on port "+port);
