"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authorizationMiddleware(req, res, next) {
    console.log("COOKIES: ", req.cookies.token);
    if (req.cookies.token !== 'token') {
        res.status(401).send('Unauthorized');
        return;
    }
    else
        next();
}
module.exports = authorizationMiddleware;
