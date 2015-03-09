/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */

"use strict";

var LinkController = require('./linkController');

function addToServer(app) {
    app.get('/api/hello', function (req, res) {
        res.send("Hello Links!")
    });
    app.get('/api/links', LinkController.all);
    app.put('/api/links/{id}', LinkController.update);
    app.patch('/api/links/{id}', LinkController.partial_update);
    app.delete('/api/links/{id}', LinkController.remove);

    app.get('/api/links/{id}', LinkController.get);
    app.post('/api/links', LinkController.create);

}

module.exports = {
    // §maybe:rename
    add: addToServer

}
