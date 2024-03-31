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
        try {
            response = (0, endpoints_1.processGetRequest)(userModel, req);
            var cacheVisibility = req.url === '/api/users' ? true : false;
            setCacheHeaders(cacheVisibility, res);
            setServerResponse(response, res);
        }
        catch (error) {
            res.statusCode = 404;
            res.end("{\"data\": null,\n\"error\": \"".concat(error.message, "\"}"));
        }
    }
    else if (req.method === 'POST') {
        var response = (0, endpoints_1.processPostRequest)(userModel, req);
        response.then(function (response) {
            setServerResponse(response, res);
        })
            .catch(function (error) {
            res.statusCode = 500;
            res.end("{\"data\": null,\n\"status\": \"There was an error processing the request. Reason: ".concat(error.message, "\"}"));
        });
    }
    else if (req.method === 'DELETE') {
        try {
            var response = (0, endpoints_1.processDeleteRequest)(userModel, req);
            setServerResponse(response, res);
        }
        catch (error) {
            res.statusCode = 404;
            res.end("{\"data\": null,\n\"error\": \"".concat(error.message, "\"}"));
        }
    }
    else if (req.method === 'PATCH' || req.method === 'PUT') {
        try {
            var response = (0, endpoints_1.processPatchRequest)(userModel, req);
            response.then(function (response) {
                setServerResponse(response, res);
            })
                .catch(function (error) {
                res.statusCode = 422;
                res.end("{\"data\": null,\n\"error\": \"".concat(error, "\"}"));
            });
        }
        catch (error) {
            res.statusCode = 404;
            res.end("{\"data\": null,\n\"error\": \"".concat(error.message, "\"}"));
        }
    }
    else {
        res.statusCode = 400;
        res.end('{"error": "Invalid HTTP method"}');
    }
});
server.listen(8000, function () {
    console.log('Server is running on port 8000');
});
var setServerResponse = function (response, res) {
    if (response !== undefined) {
        res.statusCode = 200;
        var serverResponse = {
            data: response,
            error: null
        };
        res.end(JSON.stringify(serverResponse));
    }
    else {
        res.statusCode = 404;
        res.end('{"data": null,\n"status": "Not found"}');
    }
};
var setCacheHeaders = function (visibility, res) {
    var date = new Date();
    var visibilityValue = visibility ? 'public' : 'private';
    res.setHeader('Cache-Control', "max-age=3600, ".concat(visibilityValue));
    res.setHeader('ETag', "nc-".concat(date.getTime()));
    res.setHeader('Last-Modified', date.toISOString());
    date.setSeconds(date.getSeconds() + 3600);
    res.setHeader('Expires', date.toISOString());
};
