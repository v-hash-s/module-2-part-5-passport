import UserModel from '../database/models/UserSchema'
import hashPassword from '../appLogic/hashPassword'

export async function createUser(req: any) {
    const user = new UserModel({
        email: req.body.email,
        password: await hashPassword(req.body.password)
    })
    console.log(user)
    await user.save().then((result: any) => console.log(result))
}