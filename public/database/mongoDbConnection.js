"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
exports.default = db;
