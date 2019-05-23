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

        let queue_message = { "body-json": req_body }
        if (query) {
            if (query.schedule_id){
                queue_message.service_acc_id = query.service_account_id;
                queue_message.project_id = query.project_id;
                queue_message.schedule_id = query.schedule_id;
                queue_message.alert_type = "stop_schedule_alert";
            }
            else{
            queue_message.query_params = query;
            }
        }
        context.bindings.out = queue_message;
    }
    context.done();
};
