"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPatchRequest = exports.processDeleteRequest = exports.processPostRequest = exports.processGetRequest = void 0;
var domain = "http://localhost:8000";
var processGetRequest = function (userModel, req) {
    var e_1, _a;
    var url = req.url;
    if (url === undefined) {
        return undefined;
    }
    var regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
    if (url === '/api/users') {
        return userModel.getUsers();
    }
    else {
        try {
            for (var _b = __values(url.matchAll(regexp)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var match = _c.value;
                if (match.groups !== undefined) {
                    return userModel.getHobbiesResponse(match.groups.userid);
                }
                else {
                    return undefined;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return undefined;
};
exports.processGetRequest = processGetRequest;
var processPostRequest = function (userModel, req) { return new Promise(function (resolve, reject) {
    var url = req.url;
    if (url === undefined) {
        resolve(undefined);
    }
    if (url === '/api/users') {
        parseRequestBody(req).then(function (parsedBody) {
            var newUser = userModel.createUser(parsedBody);
            resolve(newUser);
        })
            .catch(function (error) {
            reject(error);
        });
    }
    else {
        resolve(undefined);
    }
}); };
exports.processPostRequest = processPostRequest;
var processDeleteRequest = function (userModel, req) {
    var e_2, _a;
    var url = req.url;
    if (url === undefined) {
        return undefined;
    }
    var regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)$/ig;
    try {
        for (var _b = __values(url.matchAll(regexp)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var match = _c.value;
            if (match.groups !== undefined) {
                return userModel.deleteUser(match.groups.userid);
            }
            else {
                return undefined;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
};
exports.processDeleteRequest = processDeleteRequest;
var processPatchRequest = function (userModel, req) { return new Promise(function (resolve, reject) {
    var e_3, _a;
    var url = req.url;
    if (url === undefined) {
        resolve(undefined);
    }
    else {
        var regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
        var isMatched = false;
        var _loop_1 = function (match) {
            isMatched = true;
            if (match.groups !== undefined) {
                var userId_1 = match.groups.userid;
                parseRequestBody(req)
                    .then(function (parsedBody) {
                    if (parsedBody.hasOwnProperty("hobbies")) {
                        var hobbies = parsedBody["hobbies"];
                        var userResponse = userModel.updateHobbies(userId_1, hobbies);
                        resolve(userResponse);
                    }
                    else {
                        reject('Missing key \'hobbies\'');
                    }
                }).catch(function (error) {
                    reject(error.message);
                });
            }
            else {
                resolve(undefined);
            }
        };
        try {
            for (var _b = __values(url.matchAll(regexp)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var match = _c.value;
                _loop_1(match);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (!isMatched)
            resolve(undefined);
    }
}); };
exports.processPatchRequest = processPatchRequest;
var parseRequestBody = function (req) { return new Promise(function (resolve, reject) {
    var body = '';
    req.on('data', function (chunk) {
        body += chunk.toString();
    });
    req.on('end', function () {
        resolve(JSON.parse(body));
    });
    req.on('error', function (error) {
        reject(error);
    });
}); };
