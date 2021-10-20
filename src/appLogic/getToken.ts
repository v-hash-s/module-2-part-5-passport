require("dotenv").config({ path: '../../.env'});
import * as jwt from "jsonwebtoken";

export function extractToken(req: any){
    // const token = req.cookies.token.split('.')[1];
    // console.log("TOKEN: ", token)
    console.log("SECRET: ", process.env.TOKEN_KEY)
    // const user = jwt.verify(token, process.env.TOKEN_KEY!);
    const user = jwt.verify(req.cookies.token, process.env.TOKEN_KEY!);
    console.log(JSON.stringify(user))
    console.log("EMAIL: ",user.email)
    return user.email
}

// export { extractToken }