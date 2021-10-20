# module-2-part-5-passport

## Vlasta Stelmakh

### About this project:

#### This project was developed for educational purpose. 
It consists of client and server sides. Server side, which is the main focus of the project, was written with Node.js, Express and Typescript. EJS was used for client side
User attempts to log in, if his data is correct, the server sends him object, containing object with:

* total number of pages
* current page number
* array with photos links

——

### Tools used for the project

* Node.js
* Express
* Typescript
* EJS
* Cookie parser
* Express-formidable
* Simple-node-logger
* Mongoose
* Passport.js
* jsonwebtoken

——–

### Project structure:

* /logs
  * logger.log
* /public
* /src
  * /appLogic
    * createUserInDB.ts
    * getToken.ts
    * onlyUserImages.ts
    * sendToken.ts
    * isUserExist.ts
    * gallery.ts
    * upload.ts
    * login.ts
    * hashPassword.ts
  * /middlewares
    * checkToken.ts
  * /routes
    * galleryRouter.ts
    * loginRouter.ts
    * uploadRouter.ts
    * signupRouter.ts
  * /script
    * script.ts
  * /database
    * models
      * ImageSchema.ts
      * UserSchema.ts
  * interfaces.ts
  * logger.ts
  * server.ts
  
* /static
  * /pages
    * gallery.ejs
    * gallery.js
    * index.html
    * login.js
    * not_found.html
    * signup.html
    * signup.js
  * /photos
  * /uploads
* express_gallery.postman_collection.json
* gallery_express-1.0.0-swagger.yaml

——–

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

#### checkToken.ts

> Function that checks jwt token from cookies

#### **/src/appLogic**

#### isUserExist.ts

> Function that checks if the user is present in db (when the user attempts to log in or sign up)

#### createUserInDB.ts

> Function that creates new user in mongo db

#### hashPassword.ts

> Function that hashes password when user signs in

#### getToken.ts

> Function that retrieves email from jwt token

#### onlyUsersImages.ts

> Function that sends galleryResponse with images that only the user has uploaded

#### gallery.ts

> Function that returns object with page total number, current page and array of photos

#### login.ts

> Function that checks mognodb if the user has entered correct data

#### upload.ts

> Function that uploads image to static/photos and mongodb collection 'images'

#### **/src/routes**

#### galleryRouter.ts

> Router for **get** requests to */gallery* to get images

#### loginRouter.ts

> Router for **get** and **post** requests to */* to authorize

#### signUpRouter.ts

> Router for **get** and **post** requests to */* to sign up

#### **/src/database/models**

> Image schema and User schema to upload image to mongodb collection

#### **/static**

#### **/static/pages**

> Client side with .js scripts, html for login page and ejs for gallery page

#### **/static/photos**

> photos for each gallery page and upload folder to temporarily save uploaded by user photos

#### **/static/uploads**

> temporary placeholder for uploaded images

——–

### How to start the project: 

1. Clone the repository to your machine
2. Open it in you code editor
3. In terminal run command "npm install" to install all essential npm modules
4. From the root of the project run command "npm run start" to run the server
5. Open your browser and enter in the search bar "localhost:8080"
6. Enjoy the photos of architecture and upload anything you want

–––

### API

Returns html page with login form

```
GET '/'
```

Accepts email and password and returns a JWT token if those are valid

```
POST '/'
```

Returns html page with signup form

```
GET '/signup'
```

Accepts email and password and create user in mongoDB

```
POST '/'
```
Returns a specified gallery page with a specified or default limit of images per page

```
GET '/gallery?page=[number]&limit=[number]': 

```

Returns all images the specific user has uploaded

```
GET '/gallery?filter=true': 

```

Upload image to mongoDB

```
POST '/upload': 

```
