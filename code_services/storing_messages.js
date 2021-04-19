/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */



function storing_messages(req, resp) {
    //ClearBlade.init({request:req});
    var callback = function (err, data) {
        if (err) {
            resp.error("creation error : " + JSON.stringify(data));
        } else {
            resp.success(data);
        }
    };
    // These are parameters passed into the code service
    var msg_body = req.params.body;
    msg_body = JSON.parse(msg_body);

    msg_body.time = new Date(msg_body.time);

    console.log(msg_body);
    var collection = ClearBlade.Collection("d4c3d0870cbaa4e7818db9adbd08");
    collection.create(msg_body, callback);
}