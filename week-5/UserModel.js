"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var UserModel = /** @class */ (function () {
    function UserModel(initialUsers) {
        this.initialUsers = initialUsers;
        this.users = initialUsers;
    }
    UserModel.prototype.getUser = function (id) {
        return this.users.find(function (user) { return user.id === id; });
    };
    UserModel.prototype.createUser = function (user) {
        var newUser = __assign({ id: (0, crypto_1.randomUUID)(), hobbies: [] }, user);
        this.users.push(newUser);
        return newUser;
    };
    UserModel.prototype.getUsers = function () {
        return this.users;
    };
    UserModel.prototype.deleteUser = function (id) {
        var userIndex = this.users.findIndex(function (user) { return user.id === id; });
        if (userIndex >= 0) {
            return this.users.splice(userIndex, 1)[0];
        }
        else {
            throw new Error("User not found");
        }
    };
    UserModel.prototype.updateHobbies = function (id, hobbies) {
        var user = this.getUser(id);
        if (user === undefined) {
            throw new Error("User not found");
        }
        else {
            var newHobbies = new Set(__spreadArray(__spreadArray([], __read(user.hobbies), false), __read(hobbies), false));
            user.hobbies = __spreadArray([], __read(newHobbies), false);
        }
    };
    UserModel.prototype.getHobbies = function (id) {
        var user = this.getUser(id);
        if (user === undefined) {
            throw new Error("User not found");
        }
        else {
            return user.hobbies;
        }
    };
    return UserModel;
}());
exports.default = UserModel;
