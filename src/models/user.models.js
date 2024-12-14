import mongoose , {Schema} from "mongoose" ;
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt" ;

 const userSchema  = new Schema(
    {
        username : {
            type : String , 
            required : true , 
            unique : true , 
            lowercase : true , 
            trim : true ,
            index: true 
        } ,
        email : {
            type : String , 
            required : ture , 
            unique : true , 
            lowercase : true , 
            trim : true , 
        } ,
        fullname : {
            type : String , 
            required : ture , 
            trim : true , 
            index : true
        } ,
        avatar : { 
            type : String , //cloudnary url
            required : true , 
        },
        coverImage : { 
            type : String , //cloudnary yr
        },
        watchHistory : [
            {
                type : Schema.Type.ObjectId ,
                ref : "Video"
            }
        ] ,
        password : {
            type : String ,
            required : [true , "Password is Required"]
        } ,
        refreshToken : {
            type : String
        }
} , { timestamps : true }
)

// PRE : means that run this funtion when before you do something 
    // in this case that is "save"
    // before you save somehting run this function 
userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next() ;
    // this will change/set the password to the new encrytped version of the password
    this.password = bcrypt.hash(this.password , 10 )
    // makes it go to the next middleware i.e exit this middle ware
    next()
    
} )
// like this it will keep on hashing everytime a user changes something in the userSchema 
// only change - new pass , chnange pass


// CUSTOM METHOD DESIGN 
    // we wil call this function when we are going to have to compare the passwords 
userSchema.method.isPasswordCorrect = async function(password){
    // becrypt also checks passwords
    return await bcrypt.compare(password , this.password)
    // takes in 0 string passwrod 1 encrypted password to compare
}

// JWT - is a bearer token 
// whoever has this this token it is going to give them data 


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        // payload based off of which the access token will be generated
        {
            _id :  this._id ,
            email : this.email , 
            username : this.username ,
            fullname : this.fullname
        } , 
        // own secret key - to make the encryption special 
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// making a new constom method for teh userSchenma 
    // using the .methods notation 
// which contains a funciton
    // this function can't be a 
userSchema.methods.generateRefreshToken = function(){
    // this is used to create jason web token
    return jwt.sign(
        // payload which is less then the payload of the accesstoken - because it is short lived 
        {
            _id :  this._id 
        } , 
        // own secret key - which makes the encryption special and specific
        process.env.REFRESH_TOKEN_SECRET ,
        // this gives it the time frame in which it will expire
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


 export  const User = mongoose.model("User" , userSchema)

// inside the user we also have to store the watch history
//  it is an array that consists -- video id = which are also generated by mongoDB
