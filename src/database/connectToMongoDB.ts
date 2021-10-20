import * as mongoose from "mongoose";
// import * as dotenv from "dotenv";
// dotenv.config({ path: "../../.env" });

async function db() {
    console.log("Connecting database . . .");
    if (process.env.MONGODB_URI) {
        return await mongoose.connect(process.env.MONGODB_URI);
    } else {
        throw new Error("mongodb URI is not defined");
    }
}

export default db;
