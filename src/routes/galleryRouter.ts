import { Request, Response } from "express"
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'


const router = express.Router();
const app = express()
import { sendGalleryObject } from "../appLogic/gallery";
app.set("view engine", "ejs");
app.use(cookieParser())
// router.use(require('../middlewares/auth'));
router.use(require('../middlewares/checkToken'))

router.options('/', (req: Request, res: Response) => {

    res.header('Application-Type', 'multipart/form-data');
    res.send();
    
})

router.get('/', async function(req: Request, res: Response){
    const pageNumber = req.query.page;
    const limit = req.query.limit
    if (pageNumber == null || limit == null) {
        res.redirect(`/gallery?page=1&limit=10`)
        return
    } 
    const objects = await sendGalleryObject(req);
    const ejsData = { objects };
    res.render((path.join(__dirname, '../../static/pages/gallery.ejs')), { ejsData })
 });



export default router