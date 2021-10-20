import { Request } from "express";
import * as path from "path";
import ImageModel from "../database/models/ImageSchema";

export async function sendGalleryObject(req: Request) {
  console.log("QUERY: ", req.query);
  const limit = Number(req.query.limit);
  const pageNumber = Number(req.query.page);
  const dir = path.join(__dirname, "../../static/photos");

  const photos = await getPhotosArray(dir, pageNumber, limit);

  const galleryResponse = {
    objects: photos,
    total: await getTotal(req),
  };

  console.log("GALLERY Response: ", galleryResponse);

  return galleryResponse;
}

async function getPagesNumber(req: Request) {
  const limit = Number(req.query.limit);

  const counts = await ImageModel.count();
  const finalResult = Math.ceil(counts / limit);

  return finalResult;
}

async function getTotal(req: Request) {
  const total = await getPagesNumber(req);
  return total;
}

async function getPhotosArray(dir: any, pageNumber: number, limit: number) {
  const arr = await getValue();
  const photos = [];

  for (
    let i = (pageNumber - 1) * limit;
    i < limit + (pageNumber - 1) * limit && i < arr.length;
    i++
  ) {
    photos.push(arr[i].path);
  }

  return photos;
}

async function getValue() {
  const arr = await ImageModel.find({}, { path: 1, _id: 0 }).exec();
  return arr;
}
