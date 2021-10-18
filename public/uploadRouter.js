"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gallery_js_1 = require("./gallery.js");
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var formidableMiddleware = require('express-formidable');
app.use('/upload', formidableMiddleware({
    keepExtensions: true,
    uploadDir: path.resolve("../static/photos/uploads")
}));
router.use(require('./auth'));
router.options('/', function (req, res) {
    res.header('Application-Type', 'multipart/form-data');
    res.send();
});
router.post('/', function (req, res) {
    if (req.files.photo.size != '0') {
        fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos"), gallery_js_1.folders[req.fields.pageNumInForm], req.files.photo.name), function () { });
    }
    else {
        fs.unlink(req.files.photo.path, function () { });
    }
    res.status(302);
    res.redirect('/gallery' + '?page=' + req.fields.pageNumInForm);
});
module.exports = router;
