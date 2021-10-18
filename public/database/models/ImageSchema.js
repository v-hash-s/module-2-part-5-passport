"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imageSchema = new Schema({
    path: String,
    metadata: Object
});
var ImageModel = mongoose.model('images', imageSchema);
exports.default = ImageModel;
