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

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next() ;

    this.password = bcrypt.hash(this.password , 10 )
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
        {
            _id :  this._id ,
            email : this.email , 
            username : this.username ,
            fullname : this.fullname
        } , 
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id :  this._id 
        } , 
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


 export  const User = mongoose.model("User" , userSchema)

// inside the user we also have to store the watch history
//  it is an array that consists -- video id = which are also generated by mongoDB

// pa