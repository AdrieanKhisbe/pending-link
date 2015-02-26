/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */
var LinkController = require('../controller/linkController')


module.exports = [
    {
        method: 'GET',
        path: '/hello',
        handler: function(req,res){
            res("Hello Links!")
        }

    },
    {
        method: 'GET',
        path: '/api/links',
        handler:LinkController.get
    },
    {
        method: 'POST',
        path: '/api/links',
        handler:LinkController.create
    }

    ]