"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
var UserSchema_1 = require("../database/models/UserSchema");
var sendToken_1 = require("../appLogic/sendToken");
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
// router.post('/', passport.authenticate('local', { failureRedirect: '/', successRedirect: '/gallery' }))
router.post('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            passport.authenticate('local', function (err, user, info) {
                console.log(user);
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/');
                }
                req.logIn(user, function (err) {
                    return __awaiter(this, void 0, void 0, function () {
                        var userEmail, accessToken;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        return [2 /*return*/, next(err)];
                                    }
                                    userEmail = req.body.email;
                                    return [4 /*yield*/, (0, sendToken_1.default)(userEmail)];
                                case 1:
                                    accessToken = _a.sent();
                                    console.log("IN POST: ", accessToken);
                                    res.cookie('token', accessToken);
                                    return [2 /*return*/, res.redirect('/gallery')];
                            }
                        });
                    });
                });
            })(req, res, next);
            return [2 /*return*/];
        });
    });
});
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
