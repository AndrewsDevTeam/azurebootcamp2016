module.exports = function(context, req) {
    context.log("castvote function processed a request");

    context.bindings.document = {
        category : "Presenter",
        candidate : "Alonso"
    }

    context.done();
}