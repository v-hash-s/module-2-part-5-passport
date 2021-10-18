"use strict";
var cors = require('cors');
var formidableMiddleware = require('express-formidable');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('../logger.js');
var express = require('express');
var app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json(), logger);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload', formidableMiddleware({
    keepExtensions: true,
    uploadDir: path.resolve("../static/photos/uploads")
}));
app.use(express.static(path.join(__dirname, '../static/pages')));
app.use(express.static(path.join(__dirname, '../static/photos/first_page')));
app.use(express.static(path.join(__dirname, '../static/photos/second_page')));
app.use(express.static(path.join(__dirname, '../static/photos/third_page')));
app.use(express.static(path.join(__dirname, '../static/photos/fourth_page')));
app.use(express.static(path.join(__dirname, '../static/photos/fifth_page')));
var destination = path.join('../static/photos/uploads');
app.use(express.static(destination));
app.use('/static/photos/uploads', express.static('../static/photos/uploads'));
app.use(cookieParser());
