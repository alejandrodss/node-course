"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return;
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
                    return;
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
    return;
};
exports.processGetRequest = processGetRequest;
var processPostRequest = function (userModel, req) { return __awaiter(void 0, void 0, void 0, function () {
    var url, parsedBody, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.url;
                if (url === undefined) {
                    undefined;
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!(url === '/api/users')) return [3 /*break*/, 3];
                return [4 /*yield*/, parseRequestBody(req)];
            case 2:
                parsedBody = _a.sent();
                return [2 /*return*/, userModel.createUser(parsedBody)];
            case 3: return [2 /*return*/];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                throw error_1;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.processPostRequest = processPostRequest;
var processDeleteRequest = function (userModel, req) {
    var e_2, _a;
    var url = req.url;
    if (url === undefined) {
        return;
    }
    var regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)$/ig;
    try {
        for (var _b = __values(url.matchAll(regexp)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var match = _c.value;
            if (match.groups !== undefined) {
                return userModel.deleteUser(match.groups.userid);
            }
            else {
                return;
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
var processPatchRequest = function (userModel, req) { return __awaiter(void 0, void 0, void 0, function () {
    var url, regexp, parsedBody, _a, _b, match, userId, hobbies, error, error_2;
    var e_3, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                url = req.url;
                if (url === undefined) {
                    return [2 /*return*/];
                }
                regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseRequestBody(req)];
            case 2:
                parsedBody = _d.sent();
                try {
                    for (_a = __values(url.matchAll(regexp)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        match = _b.value;
                        if (match.groups !== undefined) {
                            userId = match.groups.userid;
                            if (parsedBody.hasOwnProperty("hobbies")) {
                                hobbies = parsedBody["hobbies"];
                                return [2 /*return*/, userModel.updateHobbies(userId, hobbies)];
                            }
                            else {
                                error = new Error('Missing key \'hobbies\'');
                                error.name = 'MissingKeyError';
                                throw error;
                            }
                        }
                        else {
                            return [2 /*return*/];
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _d.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
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
