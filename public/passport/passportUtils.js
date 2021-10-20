"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserSchema_1 = require("../database/models/UserSchema");
var bcrypt = require("bcrypt");
var LocalStrategy = require("passport-local").Strategy;
var customFields = {
    usernameField: "email",
    passwordField: "password",
};
var verifyCallback = function (email, password, done) {
    UserSchema_1.default.findOne({ email: email })
        .then(function (user) {
        if (!user) {
            return done(null, false);
        }
        var isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch(function (err) {
        done(err);
    });
};
var strategy = new LocalStrategy(customFields, verifyCallback);
exports.default = strategy;
