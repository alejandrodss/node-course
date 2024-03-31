"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = require("./UserModel");
var endpoints_1 = require("./endpoints");
var http = require("http");
var Datasource_1 = require("./Datasource");
var userModel = new UserModel_1.default(Datasource_1.default);
var server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET') {
        var response = void 0;
        response = (0, endpoints_1.processGetRequest)(userModel, req);
        getServerResponse(response, res);
    }
    else if (req.method === 'POST') {
        var response = (0, endpoints_1.processPostRequest)(userModel, req);
        response.then(function (response) {
            getServerResponse(response, res);
        })
            .catch(function (error) {
            res.statusCode = 500;
            res.end('{"status": "There was an error processing the request"}');
        });
    }
    else if (req.method === 'DELETE') {
        try {
            var response = (0, endpoints_1.processDeleteRequest)(userModel, req);
            getServerResponse(response, res);
        }
        catch (error) {
            res.statusCode = 404;
            res.end("{\"status\": \"".concat(error.message, "\"}"));
        }
    }
    else if (req.method === 'PATCH' || req.method === 'PUT') {
        try {
            var response = (0, endpoints_1.processPatchRequest)(userModel, req);
            response.then(function (response) {
                getServerResponse(response, res);
            })
                .catch(function (error) {
                res.statusCode = 422;
                res.end("{\"status\": \"".concat(error, "\"}"));
            });
        }
        catch (error) {
            res.statusCode = 404;
            res.end("{\"status\": \"".concat(error.message, "\"}"));
        }
    }
    else {
        res.statusCode = 400;
        res.end('{error: "Invalid HTTP method"}');
    }
});
server.listen(8000, function () {
    console.log('Server is running on port 8000');
});
var getServerResponse = function (response, res) {
    if (response !== undefined) {
        res.statusCode = 200;
        console.log(response);
        res.end(JSON.stringify(response));
    }
    else {
        res.statusCode = 404;
        res.end('{"status": "Not found"}');
    }
};
