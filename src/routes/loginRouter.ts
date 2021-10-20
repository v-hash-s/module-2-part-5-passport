import { Request, Response } from "express";
import * as express from "express";
const app = express();
import * as path from "path";
import * as cookieParser from "cookie-parser";

import { Token, ErrorMessage } from "../interfaces";
const router = express.Router();
import { isValidUser } from "../appLogic/login";
import UserModel from "../database/models/UserSchema";

import sendToken from "../appLogic/sendToken";

import * as bcrypt from "bcrypt";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (email: string, password: string, done: any) => {
  UserModel.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        return done(null, false);
      }

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
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((userId: any, done: any) => {
  UserModel.findById(userId)
    .then((user: any) => {
      done(null, user);
    })
    .catch((err: any) => done(err));
});

router.options("/", (req: Request, res: Response) => {
  res.header("Application-Type", "multipart/form-data");
  res.send();
});

router.get("/", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "../../static/pages/index.html"));
});

router.post("/", async function (req, res, next) {
  passport.authenticate("local", function (err: any, user: any, info: any) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, async function (err: any) {
      if (err) {
        return next(err);
      }
      const userEmail = req.body.email;
      const accessToken = await sendToken(userEmail);
      console.log("IN POST: ", accessToken);
      res.cookie("token", accessToken);
      return res.redirect("/gallery");
    });
  })(req, res, next);
});

export default router;
