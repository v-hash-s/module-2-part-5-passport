import { Request, Response } from "express";
import * as express from "express";
const app = express();
import * as path from "path";

const router = express.Router();
import { isUserExist } from "../appLogic/isUserExist";
import { createUser } from "../appLogic/createUserInDB";

router.get("/", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "../../static/pages/signup.html"));
});

router.post("/", async function (req: Request, res: Response) {
  const isExist = await isUserExist(req);
  if (isExist) {
    res.status(200);
    res.send(JSON.stringify("User already exists"));
  } else {
    await createUser(req).then(() => console.log("User is created"));
    res.send(JSON.stringify("User is created"));
  }
});

export default router;
