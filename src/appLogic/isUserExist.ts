import UserModel from '../database/models/UserSchema'

export async function isUserExist(req: any) {
    const data = await UserModel.findOne({ email: req.body.email }, { email: 1, password: 1 }).then(function (data: any) {
        if (data) {
            if (data.email === req.body.email && data.password === req.body.password) {
                return true
            } else {
                return false
            }
        }

    })
    console.log(data);

    return data
}

export default isUserExist