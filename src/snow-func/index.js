module.exports = function (context, req) {
    let query = req.query ? req.query : null;
    let req_body = (typeof req.body != 'undefined' && typeof req.body == 'object') ? req.body : null;
    let error = !query ? "invalid query" : null;

    if (error) {
        context.res = {
            status: 500,
            body: { "message": error }
        };
    }
    else {
        context.res = {
            status: 200,
            body: { "message": "Corestack is processing the message. Thanks for using corestack." }
        };

        let queue_message = req_body;
        if (query) {
            queue_message.query_params = query;
        }
        context.bindings.out = queue_message;
    }
    context.done();
};
