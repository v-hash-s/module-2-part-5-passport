import * as jwt from "jsonwebtoken";
import UserModel from "../database/models/UserSchema";

async function sendToken(email: string) {
  let token = await UserModel.findOne({ email: email }).then((user: any) => {
    console.log("EMAIL FROM MONGO: ", user.email);
    const userEmail = { email: user.email };
    const accessToken = jwt.sign(userEmail, process.env.TOKEN_KEY!, {
      expiresIn: 600000,
    });
    return accessToken;
  });
  console.log("IN FUNCTION: ", token);
  return token;
}

export default sendToken;
