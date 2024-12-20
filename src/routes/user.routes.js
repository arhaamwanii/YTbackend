import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register" ).post(
    upload.fields([
        {
            name : "avatar" , 
            maxCount : 1
        }, 
        {
            name : "coverImage" ,
            maxCount : 1
        }
    ]), 
    registerUser
)
// putting in middleware i.e on the way out meet me first 
    // we are going to put the multer middle ware here so that it will help with file upload 
    // what method is going to be executed put in the middle before that


export default router
// if we export via export default we can name it wahtever we want at import 
// becuse one file only exports one function 





// CREATES A NEW ENDPOINT 
    // -- which is at the end of /api/v1/users

router.route("/page").get((req , res) => {
    console.log(req)
    res.send("<h1>this is sending</h1>")
    console.log("something is working")
})