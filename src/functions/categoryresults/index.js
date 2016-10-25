var DocumentClient = require('documentdb').DocumentClient;

var host = GetEnvironmentVariable("DocumentDbHost"); 
var masterKey = GetEnvironmentVariable("DocumentDbMasterKey"); 
var dbLink = 'dbs/' + GetEnvironmentVariable("DocumentDbName");
var collLink = dbLink + '/colls/voteTally';
var client = new DocumentClient(host, {masterKey: masterKey});

function GetEnvironmentVariable(name)
{
    return process.env[name];
}

module.exports = function (context, req) {
    context.log('categoryresults function processed a request');

    if (req.query.category || (req.body && req.body.category)) {
        var category = (req.query.category || req.body.category);
        var querySpec = {
            query: "SELECT * FROM voteTally vt WHERE vt.category = @category",
            parameters: [
                {
                    name: "@category",
                    value: category
                }
            ]
        };
        client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
            if (err) {
                context.log('categoryresults function failed to query voteTally collection', err);
                context.res = {
                    status: 404,
                    body: "Sorry, we could not find the results requested right now... try again later."
                }
            } else {
                context.log('categoryresults found the following results: ', results)
                context.res = {
                    body: results
                };
            }
            context.done();
        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a category on the query string or in the request body"
        };
        context.done();
    }
};