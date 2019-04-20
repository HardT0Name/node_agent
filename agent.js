let request = require("request");//.defaults({'proxy':'http://127.0.0.1:8080'});

async function send_request(req) {
    return new Promise((resolve, reject) => {
        request(req, (error, response, body) => {
            if(error) {
                reject(error);
            }
            else {
                console.log("send_request",[response, body])
                resolve([response, body])   ;
            }
        });
    })
    .catch(err => {
        console.error("send_request error in agent.js:", err);
    })
}

module.exports = async function({url, headers, method, body}) {
    try{
        console.log("agent start:","-->");
        let req = {
            method,
            url,
        };

        if(body) {
            req['body'] = body;
        }

        req['headers'] = headers;
        console.log(req);
        let res = await send_request(req);
        console.log("res", res);
        console.log("agent return:","<--");
        return res;
    }
    catch(e) {
        console.error("main function error in agent.js :", e);
    }
};