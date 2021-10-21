import UserModel from "../database/models/UserSchema";
const JwtStrategy = require("passport-jwt").Strategy;

const options = {
    secretOrKey: process.env.TOKEN_KEY,
    jwtFromRequest: (req: any) => {
        if (req && req.cookies) {
            return req.cookies.token;
        }
        return null;
    },
};

const verifyJWTCallback = async (jwt_payload: any, done: any) => {
    const isPresent = await UserModel.find({ email: jwt_payload.email }).then(
        (user: any) => {
            console.log(user);
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        }
    );
    return isPresent;
};

const strategyJWT = new JwtStrategy(options, verifyJWTCallback);

export default strategyJWT;
