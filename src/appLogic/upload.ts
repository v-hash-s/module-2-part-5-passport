import * as fs from "fs";
import * as path from "path";
import ImageModel from "../database/models/ImageSchema";
import { extractToken } from "./getToken";

export async function uploadImg(req: any, res: any) {
  if (req.files.photo.size != "0") {
    console.log(req.files.photo.name);
    const isPresent: any = await isExist(req.files.photo.name);
    console.log("IS REAL: ", isPresent);
    if (isPresent) {
      return;
    } else {
      console.log("CONTINUED");

      fs.renameSync(
        req.files.photo.path,
        path.join(__dirname, "../../static/photos/", req.files.photo.name)
      );
      const img = req.files.photo.name;
      const stats = fs.statSync(
        path.join(__dirname, `../../static/photos/${img}`)
      );
      const user = extractToken(req);
      console.log("USER WHEN UPLOADS: ", user);
      const image = new ImageModel({
        path: img,
        metadata: stats,
        owner: user,
      });
      await image.save().then((result: any) => console.log(result));
    }
  } else {
    fs.unlinkSync(req.files.photo.path);
  }
}

async function isExist(imagePath: string) {
  const exist = await ImageModel.findOne({ path: imagePath }, { path: 1 }).then(
    function (data: any) {
      if (data) {
        return true;
      } else {
        return false;
      }
    }
  );
  return exist;
}
