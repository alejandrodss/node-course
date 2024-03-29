"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_js_1 = require("./UserModel.js");
var endpoint = require("./endpoints.js");
var http = require("http");
var Datasource_1 = require("./Datasource");
var userModel = new UserModel_js_1.default(Datasource_1.default);
var server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET') {
        var response = void 0;
        response = endpoint.processGetRequest(userModel, req);
        if (response !== undefined) {
            res.statusCode = 200;
            console.log(response);
            res.end(JSON.stringify(response));
        }
        else {
            res.statusCode = 404;
            res.end('{"status": "Not found"}');
        }
    }
    else if (req.method === 'POST') {
    }
    else if (req.method === 'DELETE') {
    }
    else if (req.method === 'PATCH' || req.method === 'PUT') {
    }
    else {
        res.statusCode = 400;
        res.end('{error: "Invalid HTTP method"}');
    }
});
server.listen(8000, function () {
    console.log('Server is running on port 3000');
});
