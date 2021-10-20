"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    console.log("Checking cookies");
    if (!req.cookies) {
        res.redirect('/');
        return;
    }
    if (process.env.TOKEN_KEY) {
        var token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
            if (err) {
                res.redirect('/');
            }
            next();
        });
        console.log("Cookie are alright");
    }
    else
        throw new Error('TOKEN_KEY not found');
}
module.exports = verifyToken;
// export { extractUserFromToken };
