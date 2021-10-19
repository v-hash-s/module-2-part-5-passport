import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import * as path from 'path'
import * as express from 'express'
const app = express()

import db from './database/connectToMongoDB'

import { Request, Response } from "express"
import * as formidableMiddleware from 'express-formidable'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'

// // PASSPORT
import * as passport from 'passport'
app.use(passport.initialize());
// import * as passport from 'passport'
// const LocalStrategy = require('passport-local').Strategy;
// import UserModel from './database/models/UserSchema';
// import * as session from 'express-session'

// app.use(session({
//     secret: process.env.SESSION_SECRET!,
//     saveUninitialized: false,
//     resave: false
//   }));
  
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // PASSPORT


db()
  .then(() => console.log('Database connection established'))
  .then(() => app.listen(process.env.PORT, () => console.log(`At port ${process.env.PORT}`)))
  .catch((err: any) => console.log(err.message))


app.use(cors({
  origin: '*'
}))


app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/upload', formidableMiddleware({
  keepExtensions: true,
  uploadDir: path.resolve("../static/uploads")

}));

app.use(express.static(path.join(__dirname, '../static/pages')))
app.use(express.static(path.join(__dirname, '../static/photos')))

app.use('/static/photos/uploads', express.static('../../static/photos/uploads'))

app.use(cookieParser())

import loginRouter from './routes/loginRouter'
import galleryRouter from './routes/galleryRouter'
import uploadRouter from './routes/uploadRouter'
import signupRouter from './routes/signupRouter'

app.use('/', loginRouter)
app.use('/gallery', galleryRouter)
app.use('/upload', uploadRouter)
app.use('/signup', signupRouter)

app.all('*', (req: Request, res: Response) => {
  res.status(404).end(`Page ${req.url} not found`);
    
  });

