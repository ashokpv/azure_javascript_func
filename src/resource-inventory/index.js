module.exports = function (context, req) {
    let query = req.query ? req.query : null;
    let req_body = (typeof req.body != 'undefined' && typeof req.body == 'object') ? req.body : null;
    let error = !query ? "invalid query" : null;
    context.log("started func");
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

        if (query) {
            if (query.queue_name){
                if (query.queue_name == 'activity_log'){
                    context.bindings.output = req_body;
                }
                else if (query.queue_name == 'shallow_discovery'){
                    context.log(req_body)
                    context.bindings.out = req_body;
                }
                
            }
            
        }
        
    }
    context.done();
};
