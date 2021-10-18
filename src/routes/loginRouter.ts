import { Request, Response } from "express"
import * as express from 'express'
const app = express()
import * as formidableMiddleware from 'express-formidable'
import * as path from 'path'
import * as fs from 'fs'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'





import { UsersDB, Token, ErrorMessage } from "../interfaces"
const router = express.Router();
import { isValidUser, sendToken } from '../appLogic/login'


export const token: Token = {
    'token': 'token',
}

export const users: UsersDB = {
    'asergeev@flo.team': 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team',
}

router.options('/', (req: Request, res: Response) => {

    res.header('Application-Type', 'multipart/form-data');
    
    res.send();
    
})

router.get('/', function(req: Request, res: Response){
    res.sendFile(path.join(__dirname, '../../static/pages/index.html'))
 });


 router.post('/', async function(req: Request, res: Response){
     const isValid = await (isValidUser(req))
    if (isValid){
        res.status(200);
        res.cookie('token', 'token')
        res.send(sendToken())
    } else {
        res.status(401);
        res.send({ errorMessage: 'Invalid email or password'});
    }
 });

export default router
