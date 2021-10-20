"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = void 0;
require("dotenv").config({ path: '../../.env' });
var jwt = require("jsonwebtoken");
function extractToken(req) {
    // const token = req.cookies.token.split('.')[1];
    // console.log("TOKEN: ", token)
    console.log("SECRET: ", process.env.TOKEN_KEY);
    // const user = jwt.verify(token, process.env.TOKEN_KEY!);
    var user = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
    console.log(JSON.stringify(user));
    console.log("EMAIL: ", user.email);
    return user.email;
}
exports.extractToken = extractToken;
// export { extractToken }
