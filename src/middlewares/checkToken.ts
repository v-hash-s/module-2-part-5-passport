import * as jwt from "jsonwebtoken";
import * as cookieParser from 'cookie-parser'


function verifyToken(req: any, res: any, next: Function) {
    console.log("Checking cookies")
    if(!req.cookies) {

        res.redirect('/');
        return;

    }

    if(process.env.TOKEN_KEY) {
        
      
        let token =  req.cookies.token;
        jwt.verify(token, process.env.TOKEN_KEY, (err: any, decoded: any) => {

            if(err) {
                res.redirect('/');
            }
            next();

        })
    console.log("Cookie are alright")
    }

    else throw new Error('TOKEN_KEY not found');
}

module.exports = verifyToken;
// export { extractUserFromToken };
