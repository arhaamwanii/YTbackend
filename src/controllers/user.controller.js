import { APIError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uplaodOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req , res) => {
    // req will come /register 
        // we can take the data from postman 
    // validation  
        // - data should not be empty and should have the stuff that is needed
    // check if user already exists
        // check via email 
    // check for images  
        // check for avatar(compulsary)
        // upload to cloudanry
        // take the refrece from url - i.e from response 
        // check for succesfull uplaod
            // on cloudnary 
    // create user object -
        // create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    
    const {fullName , email , username , password} = req.body
    console.log( fullName , email , username , password)

// cheking for emply fields

    if([fullName , email , username , password].some((field) => field?.trim() === "")){
        throw new APIError(400 , "all fields are Required")
}
// check if user already exists

const existedUser = User.findOne({
    $or : [ {email} , {username} ]
})

if(existedUser){
    throw new APIError(409 , "User with emaila or username Already Exists")
}

console.log(existedUser)
console.log(req.files)

//multer will save these files autocmatically in the public folder 

const avatarLocalPath = req.files?.avatar[0]?.path
const coverImageLocalPath = req.files?.coverImage[0]?.path

if(!avatarLocalPath){
    throw new APIError(400 , "Avatar is Required")
}

// uploading to cloudinary

const avatarUpoad = await uplaodOnCloudinary(avatarLocalPath)
const coverImageUpload = await uplaodOnCloudinary(coverImageLocalPath)

// as avatar is required field we have to check for its successfull upload

if (!avatarUpoad){
    throw new APIError(500 , "Avatar Upload Failed")
}

// creating an entry in the data base
    // we already have created a used model based on which we will create an entry
const user = User.create({
    fullName  ,
    avatart : avatarUpoad.url ,
    coverImage : coverImageUpload?.url || "" ,
    email , 
    password ,
    username : username.toLowerCase() 
})

// checking for the user 
    // select by default selects all the fields then we have to pass what we don't want to select as input 

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(createdUser){
    throw new APIError(500 , "Something went wtrong while creating a User")
}

// sending the data back with the saved data

return res.status(201).json(
    new ApiResponse(200 , createdUser  , "User registered Successfully")
)

})

export {registerUser}












// CONTROLLERS ARE WHERE THE BUSSINESS LOGIC IS WRITTEN


// this a controller that sends the ok response once it is called 
// now when in router/routes when a specific method is created it sends a
//  i.e we will call this contrller - when we have to send a ok response 
    // i.e user registered 
    //  ---
    // return res.status(200).json({
    //     message : "ok"
    // })
    // this code here sends two things 
        // A- status code
        // B-  .json response


// POINTS ABOUT THIS 

// information from forms and in json comes in in
    // req.body
// url is different

// paramas is also a way to send data from the frontend 