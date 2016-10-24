module.exports = function(context, req) {
    context.log("castvote function processed a request");

    if (req.body && req.body.category && req.body.candidate) {
        var item = {
            category : req.body.category,
            candidate : req.body.candidate
        };
        context.bindings.document = item;
        context.bindings.queueItem = item;
    } else {
        context.res = {
            status: 400,
            body: "Please include the category and candidate with your vote",
            headers: {
                'Content-Type': 'text/plain'
            }
        };
    }

    context.done();
}