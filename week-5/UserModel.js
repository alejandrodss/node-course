"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = /** @class */ (function () {
    function UserModel(initialUsers) {
        this.initialUsers = initialUsers;
        this.users = initialUsers;
    }
    UserModel.prototype.getUser = function (id) {
        return this.users.find(function (user) { return user.id === id; });
    };
    UserModel.prototype.createUser = function (user) {
        var currentUser = this.getUser(user.id);
        if (currentUser === undefined) {
            this.users.push(user);
        }
        else {
            throw new Error("Duplicated user");
        }
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
            user.hobbies = hobbies;
        }
        console.log(this.users);
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
