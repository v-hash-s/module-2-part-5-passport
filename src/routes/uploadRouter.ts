import { Request, Response } from "express";
import { uploadImg } from "../appLogic/upload";

import * as express from "express";
const router = express.Router();

import * as passport from "passport";
import strategyJWT from "../passport/passportJwt";
passport.use(strategyJWT);

router.options("/", (req: Request, res: Response) => {
    res.header("Application-Type", "multipart/form-data");
    res.send();
});

router.post("/", async function (req: any, res: any, next: any) {
    passport.authenticate(
        "jwt",
        {
            session: false,
            failureRedirect: "/",
        },
        (err: any, user: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.redirect("/");
            }
        }
    )(req, res, next);

    await uploadImg(req, res);
    res.status(302);
    res.redirect(
        "/gallery" +
            "?page=" +
            req.fields.pageNumInForm +
            "&limit=" +
            req.fields.limitNumInForm
    );
});

export default router;
