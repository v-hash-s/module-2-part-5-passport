"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
var path = require("path");
var express = require("express");
var app = express();
var connectToMongoDB_1 = require("./database/connectToMongoDB");
var formidableMiddleware = require("express-formidable");
var cors = require("cors");
var cookieParser = require("cookie-parser");
// // PASSPORT
var passport = require("passport");
app.use(passport.initialize());
// import * as passport from 'passport'
// const LocalStrategy = require('passport-local').Strategy;
// import UserModel from './database/models/UserSchema';
// import * as session from 'express-session'
// app.use(session({
//     secret: process.env.SESSION_SECRET!,
//     saveUninitialized: false,
//     resave: false
//   }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// // PASSPORT
(0, connectToMongoDB_1.default)()
    .then(function () { return console.log('Database connection established'); })
    .then(function () { return app.listen(process.env.PORT, function () { return console.log("At port " + process.env.PORT); }); })
    .catch(function (err) { return console.log(err.message); });
app.use(cors({
    origin: '*'
}));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', formidableMiddleware({
    keepExtensions: true,
    uploadDir: path.resolve("../static/uploads")
}));
app.use(express.static(path.join(__dirname, '../static/pages')));
app.use(express.static(path.join(__dirname, '../static/photos')));
app.use('/static/photos/uploads', express.static('../../static/photos/uploads'));
app.use(cookieParser());
var loginRouter_1 = require("./routes/loginRouter");
var galleryRouter_1 = require("./routes/galleryRouter");
var uploadRouter_1 = require("./routes/uploadRouter");
var signupRouter_1 = require("./routes/signupRouter");
app.use('/', loginRouter_1.default);
app.use('/gallery', galleryRouter_1.default);
app.use('/upload', uploadRouter_1.default);
app.use('/signup', signupRouter_1.default);
app.all('*', function (req, res) {
    res.status(404).end("Page " + req.url + " not found");
});
