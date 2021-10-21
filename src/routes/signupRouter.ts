import { Request, Response } from "express";
import * as express from "express";
const app = express();
import * as path from "path";

const router = express.Router();
import { isUserExist } from "../appLogic/isUserExist";
import { createUser } from "../appLogic/createUserInDB";
import errorHandler from "../middlewares/errorHandler";

router.get("/", function (req: Request, res: Response, next: any) {
    try {
        res.sendFile(path.join(__dirname, "../../static/pages/signup.html"));
    } catch (err: any) {
        errorHandler(err, req, res, next);
    }
});

router.post("/", async function (req: Request, res: Response, next: any) {
    try {
        const isExist = await isUserExist(req);
        if (isExist) {
            res.status(200);
            res.send(JSON.stringify("User already exists"));
        } else {
            await createUser(req).then(() => console.log("User is created"));
            res.send(JSON.stringify("User is created"));
        }
    } catch (err: any) {
        errorHandler(err, req, res, next);
    }
});

export default router;
