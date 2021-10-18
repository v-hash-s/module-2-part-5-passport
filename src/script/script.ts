import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'


const readdir = util.promisify(fs.readdir);


const images = readdir(path.join(__dirname, '../../static/photos'))
console.log(path.join(__dirname, '../../static/photos'))

async function getData(images: any) {
    const arr: any = []
    const asyncImages = await images
    for (const img of asyncImages) {
    
        await new Promise((resolve, reject) => {
            fs.stat(path.resolve(path.join(__dirname, `../../static/photos/${img}`)), (err: any, data: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(arr.push({ metadata: data, image: img }))
                }
            })
        })
    }
    return arr
}

const newArr = getData(images)

export default newArr


