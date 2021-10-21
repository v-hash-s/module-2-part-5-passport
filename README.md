# module-2-part-4-mongodb-gallery

## Vlasta Stelmakh

### About this project:

#### This project was developed for educational purpose.

It consists of client and server sides. Server side, which is the main focus of the project, was written with Node.js, Express and Typescript. EJS was used for client side
User attempts to log in, if his data is correct, the server sends him object, containing object with:

-   total number of pages
-   current page number
-   array with photos links

——

### Tools used for the project

-   Node.js
-   Express
-   Typescript
-   EJS
-   Cookie parser
-   Express-formidable
-   Simple-node-logger
-   Mongoose
-   pm2

——

### Project structure:

-   /logs
    -   logger.log
-   /public
-   /src
    -   /appLogic
        -   gallery.ts
        -   upload.ts
        -   login.ts
    -   /middlewares
        -   auth.ts
    -   /routes
        -   galleryRouter.ts
        -   loginRouter.ts
        -   uploadRouter.ts
    -   /script
        -   script.ts
    -   /database
        -   models
            -   ImageSchema.ts
    -   interfaces.ts
    -   logger.ts
    -   server.ts
-   /static
    -   /pages
        -   gallery.ejs
        -   gallery.js
        -   index.html
        -   login.js
        -   not_found.html
    -   /photos
    -   /uploads
-   express_gallery.postman_collection.json
-   gallery_express-1.0.0-swagger.yaml

——

### Project structure description:

#### interfaces.ts

> Interfaces for other files

#### logger.ts

> Function to create logs to /logs/logger.log

#### server.ts

> Main router to direct user to specific pages according to his requests

#### express_gallery.postman_collection.json

> postman collection to test requests with Postman

#### gallery_express-1.0.0-swagger.yaml

> description of requests with swagger

#### **/script**

#### **/script/script.ts**

> Simple function to upload many photos to mongodb (was used for starting the project and not supposed to be used anymore, unless you delete all photos from db and want to upload them back)

#### **/logs**

> Logs info

#### logger.log

> Logs created with logger.ts

#### **/public**

> Compiled .ts to .js files

#### **/src**

> Typescript files

#### **/src/middlewares**

#### auth.ts

> Function that checks cookies if user has the token to use gallery

#### **/src/appLogic**

#### gallery.ts

> Function that returns object with page total number, current page and array of photos

#### login.ts

> Function that checks mognodb if the user has entered correct data

#### upload.ts

> Function that uploads image to static/photos and mongodb collection 'images'

#### **/src/routes**

#### galleryRouter.ts

> Router for **get** requests to _/gallery_ to get images

#### loginRouter.ts

> Router for **get** and **post** requests to _/_ to authorize

#### **/src/database/models**

> Image schema to upload image to mongodb collection

#### **/static**

#### **/static/pages**

> Client side with .js scripts, html for login page and ejs for gallery page

#### **/static/photos**

> photos for each gallery page and upload folder to temporarily save uploaded by user photos

#### **/static/uploads**

> temporary placeholder for uploaded images

——

### How to start the project:

1. Clone the repository to your machine
2. Open it in you code editor
3. In terminal run command "npm install" to install all essential npm modules
4. From the root of the project run command "npm run start" to run the server
5. Open your browser and enter in the search bar "localhost:8080"
6. Enjoy the photos of architecture and upload anything you want
