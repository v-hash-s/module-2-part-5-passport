"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    password: String
});
var UserModel = mongoose.model('users', userSchema);
exports.default = UserModel;
