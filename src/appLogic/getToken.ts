require("dotenv").config({ path: "../../.env" });
import * as jwt from "jsonwebtoken";

export function extractToken(req: any) {
  console.log("SECRET: ", process.env.TOKEN_KEY);
  const user = jwt.verify(req.cookies.token, process.env.TOKEN_KEY!);
  console.log(JSON.stringify(user));
  console.log("EMAIL: ", user.email);
  return user.email;
}
