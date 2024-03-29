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
exports.processGetRequest = void 0;
var domain = "http://localhost:8000";
var processGetRequest = function (userModel, req) {
    var e_1, _a;
    var url = req.url;
    if (url === undefined) {
        return undefined;
    }
    var regexp = /api\/users\/(?<userid>[a-zA-Z0-9]+)\/hobbies/ig;
    if (url === '/api/users') {
        return userModel.getUsers();
    }
    else {
        try {
            /*console.log("regexp pass");
            const matches = [...url.matchAll(regexp)];
            console.log(matches);*/
            for (var _b = __values(url.matchAll(regexp)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var match = _c.value;
                console.log("matches regexp");
                if (match.groups !== undefined) {
                    console.log("fetching hobbies");
                    return userModel.getUser(match.groups.userid);
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
    console.log(url);
    return undefined;
};
exports.processGetRequest = processGetRequest;
