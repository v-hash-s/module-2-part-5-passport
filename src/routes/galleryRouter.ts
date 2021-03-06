import { Request, Response } from "express";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";

const router = express.Router();
const app = express();
import { sendGalleryObject } from "../appLogic/gallery";
import { sendUsersImages } from "../appLogic/onlyUsersImages";
import { extractToken } from "../appLogic/getToken";
app.set("view engine", "ejs");
app.use(cookieParser());
router.use(require("../middlewares/checkToken"));

router.options("/", (req: Request, res: Response) => {
  res.header("Application-Type", "multipart/form-data");
  res.send();
});

router.get("/", async function (req: Request, res: Response) {
  console.log(req.query.filter);
  if (req.query.filter) {
    const email = extractToken(req);
    const objects = await sendUsersImages(email);
    const ejsData = { objects };
    res.render(path.join(__dirname, "../../static/pages/gallery.ejs"), {
      ejsData,
    });
  } else {
    const pageNumber = req.query.page;
    const limit = req.query.limit;
    if (pageNumber == null || limit == null) {
      res.redirect(`/gallery?page=1&limit=10`);
      return;
    }
    const objects = await sendGalleryObject(req);
    const ejsData = { objects };
    res.render(path.join(__dirname, "../../static/pages/gallery.ejs"), {
      ejsData,
    });
  }
});

export default router;
