import { Token } from '../interfaces'
import UserModel from '../database/models/UserSchema'
import hashPassword from '../appLogic/hashPassword'
import * as bcrypt from 'bcrypt'




export const token: Token = {
    'token': 'token',
}


export async function isValidUser(req: any){


    const data = await UserModel.findOne({ email: req.body.email }, { email: 1, password: 1 }).then(function (data: any) {

        if(data){
            const isValidPassword = bcrypt.compareSync(req.body.password, data.password);
            console.log("Is valid password: ", isValidPassword)
            if (data.email === req.body.email && isValidPassword) {
                return true
            } else {
                return false
            }
        }
        
    })
    console.log(data);

   return data
}



export function sendToken(){

        return JSON.stringify(token)
    
}

