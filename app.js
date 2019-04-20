var http = require('http');
var agent = require("./agent");

http.createServer(async function (request, response) {
    let body = await new Promise((resolve, reject) => {
        let body = [];
        try {
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                resolve(Buffer.concat(body).toString());
            });
        }
        catch(e) {
            console.error(e);
        }
    })
    .catch(e => {
        console.error(e);
    })

    let headers = request.headers;
    let method = request.method;
    let url = request.url;

    let res = await agent({
        url,
        headers,
        method,
        body,
    })
    .catch(error => {
        console.error(`agent error in app.js:`,error);
    })
    console.log("app get -->", res[0].headers, res[1]);
    response.writeHead(res[0].statusCode, res[0].headers);
    response.end(res[1]);
}).listen(8888);

console.log('Server running at http://0.0.0.0:8888/');