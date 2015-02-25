// Pending Link
/* Premier Serveur */

var http = require('http');
var MESSAGE = 'Pending Link in building, come back later !';

var server = http.createServer(function(req,rep) {
    rep.writeHead(200);
    rep.end(MESSAGE);
});

console.warn(MESSAGE);
var port = process.env.PORT || 12121;
server.listen(port);
console.log("Listening on port "+port);
