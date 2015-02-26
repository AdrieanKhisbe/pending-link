/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */
module.exports = [
    {
        method: 'GET',
        path: '/hello',
        handler: function(req,res){
            res("Hello Links!")
        }

    }

    ]