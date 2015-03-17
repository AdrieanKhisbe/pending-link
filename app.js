/** Pending Link */

var options = require('./src/config/options').option_from(~~process.env.PORT);
var log = options.logger;

var framework, express = './src/express', hapi = './src/hapi';

switch(process.argv[2].toLowerCase()){
  // TODO: maybe replace with config,option
  case "hapi":
    framework = hapi;
    log.info("Launching server with hapi framework");
    break;
  case "express":
    framework = express;
    log.info("Launching server with express framework");
    break;
  default:
    framework = express;
    log.info("Launching server with default framework, express");
}

var server = require(framework)(options) ;

log.info("Starting pending link");
server.loadGoodies();
server.start(function() {
    log.info("Listening on port "+ options.port);
});
