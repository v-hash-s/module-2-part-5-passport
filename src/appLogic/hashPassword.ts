import * as bcrypt from "bcrypt";

async function hashPassword(password: string) {
    console.log("Pasword in function: ", password);
    const saltRounds = process.env.SALT_ROUNDS;
    const salt = await getSalt(Number(saltRounds));
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password: ", hashedPassword);
    return hashedPassword;
}

async function getSalt(saltRounds: number) {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Salt: ", salt);
    return salt;
}

export default hashPassword;
