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

function sort_by_datetime(x, y) {
    return x.cpu_usage - y.cpu_usage
}

function analyze_states(req, resp) {
    // These are parameters passed into the code service
    var params = req.params;

    const get_avg_cpu_usage = function (data) {
        result = 0;
        data.forEach(function (item) { result += item.cpu_usage });
        result /= data.length;
        return result
    }

    const callback = function (err, data) {
        if (err) {
            resp.error("fetch error : " + JSON.stringify(data));
        } else {
            var results = data.DATA;
            if (results.length > 0) {
                analysis_report = {}
                results = results.sort(sort_by_datetime);
                analysis_report.avg_cpu_usage = get_avg_cpu_usage(results);
                analysis_report.min_cpu_usage = results[0].cpu_usage;
                analysis_report.max_cpu_usage = results[results.length - 1].cpu_usage;
                analysis_report.data_points_count = results.length;
                var msg = ClearBlade.Messaging();
                msg.publish("analytics", JSON.stringify(analysis_report))
            }
            resp.success("Success");
        }
    };

    var collection = ClearBlade.Collection("d4c3d0870cbaa4e7818db9adbd08");
    collection.fetch(callback).DATA;
}
