import UserModel from "../database/models/UserSchema";

import * as bcrypt from "bcrypt";

import * as passport from "passport";
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

export default strategy;
