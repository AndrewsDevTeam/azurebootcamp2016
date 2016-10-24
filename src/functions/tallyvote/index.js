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

module.exports = function (context, myQueueItem) {
    context.log('tallyvote function processed work item', myQueueItem);
    var querySpec = {
        query: "SELECT * FROM voteTally vt WHERE vt.category = @category AND vt.candidate = @candidate",
        parameters: [
            {
                name: "@category",
                value: myQueueItem.category
            },
            {
                name: "@candidate",
                value: myQueueItem.candidate
            }
        ]
    };
    client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
        if (err) {
            context.log('tallyvote function failed to query voteTally collection', err);
        } else {
            if (results.length == 0) {
                var doc = {
                    category: myQueueItem.category,
                    candidate: myQueueItem.candidate,
                    count: 1
                };
                client.createDocument(collLink, doc, function(err, document) {
                    if (err) {
                        context.log('tallyvote function failed to create document in voteTally collection', err);
                    } else {
                        context.log('tally vote created doc in voteTally collection', document);
                    }
                });
            } else {
                var doc = results[0];
                doc.count = doc.count + 1;
                client.upsertDocument(collLink, doc, function(err, document) {
                    if (err) {
                        context.log('tallyvote function failed to replace document in voteTally collection', err);
                    } else {
                        context.log('tally vote replaced doc in voteTally collection', document);
                    }
                });
            }
        }
    })
    context.done();
};