import { Request, Response } from "express"
import * as express from 'express'
const app = express()
import * as path from 'path'


import { Token, ErrorMessage } from "../interfaces"
const router = express.Router();
import { isValidUser, sendToken } from '../appLogic/login'
import UserModel from "../database/models/UserSchema"
// PASSPORT
import * as bcrypt from 'bcrypt'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email: string, password: string, done: any) => {

    UserModel.findOne({ email: email })
        .then((user: any) => {

            if (!user) { return done(null, false) }
            
            const isValidPassword = bcrypt.compareSync(password, user.password);
            
            if (isValidPassword) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err: any) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((userId: any, done: any) => {
    UserModel.findById(userId)
        .then((user: any) => {
            done(null, user);
        })
        .catch((err: any) => done(err))
});
// To use with sessions

// PASSPORT


export const token: Token = {
    'token': 'token',
}

router.options('/', (req: Request, res: Response) => {

    res.header('Application-Type', 'multipart/form-data');
    
    res.send();
    
})

router.get('/', function(req: Request, res: Response){
    res.sendFile(path.join(__dirname, '../../static/pages/index.html'))
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


// router.post('/login', passport.authenticate('local'), (req, res) => {
    
//   });

router.post('/', passport.authenticate('local', { failureRedirect: '/', successRedirect: '/gallery' }));

export default router
