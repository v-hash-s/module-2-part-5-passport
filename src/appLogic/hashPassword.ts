import * as bcrypt from 'bcrypt'


async function hashPassword(password: string) {
    console.log("Pasword in function: ", password)
    const saltRounds = 10;
    const salt = await getSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password: ", hashedPassword)
    return hashedPassword
}

async function getSalt(saltRounds: number) {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log('Salt: ', salt)
    return salt
}

export default hashPassword