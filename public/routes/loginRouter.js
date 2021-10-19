"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
var UserSchema_1 = require("../database/models/UserSchema");
// JWT
var jwt = require('jsonwebtoken');
// JWT
// PASSPORT
var bcrypt = require("bcrypt");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var customFields = {
    usernameField: 'email',
    passwordField: 'password'
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
passport.use(strategy);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (userId, done) {
    UserSchema_1.default.findById(userId)
        .then(function (user) {
        done(null, user);
    })
        .catch(function (err) { return done(err); });
});
// To use with sessions
// PASSPORT
// export const token: Token = {
//     'token': 'token',
// }
router.options('/', function (req, res) {
    res.header('Application-Type', 'multipart/form-data');
    res.send();
});
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../static/pages/index.html'));
});
//  router.post('/', async function(req: Request, res: Response){
//      const isValid = await (isValidUser(req))
//     if (isValid){
//         res.status(200);
//         res.cookie('token', 'token')
//         res.send(sendToken())
//     } else {
//         res.status(401);
//         res.send({ errorMessage: 'Invalid email or password'});
//     }
//  });
router.post('/', passport.authenticate('local', { failureRedirect: '/', successRedirect: '/gallery' }));
// router.post('/', function(req: any, res: any){
//     passport.authenticate('local', {session: false}, (err: any, user: any, info: any) => {
//         console.log("USER: ", user)
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }
//        req.login(user, {session: false}, (err: any) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, process.env.JWT_SECRET);
//            console.log("TOKEN: ",token)
//            console.log("AGAIN USER: ", user)
//            res.json({user, token});
//         })
//     })(req, res);;
// })
exports.default = router;
