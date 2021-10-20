import { Request, Response } from "express";
import * as express from "express";
import * as path from "path";

const router = express.Router();
import UserModel from "../database/models/UserSchema";

import sendToken from "../appLogic/sendToken";

import * as passport from "passport";
import strategy from "../passport/passportUtils";

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
