"use strict";
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({
    origin: '*'
}));
