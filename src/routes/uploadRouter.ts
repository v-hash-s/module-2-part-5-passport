import { Request, Response } from "express";
import { uploadImg } from "../appLogic/upload";

import * as express from "express";
const router = express.Router();

router.use(require("../middlewares/checkToken"));

router.options("/", (req: Request, res: Response) => {
  res.header("Application-Type", "multipart/form-data");
  res.send();
});

router.post("/", async function (req: any, res: any) {
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
