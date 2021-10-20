import ImageModel from "../database/models/ImageSchema";

export async function sendUsersImages(email: string) {
  const objects = await ImageModel.find(
    { owner: email },
    { path: 1, _id: 0 }
  ).exec();
  console.log(objects);
  const images = objects.map((img: any) => {
    return img.path;
  });
  console.log(images);

  const galleryResponse = {
    objects: images,
  };
  return galleryResponse;
}
