import connectDB from "./db/index.js";
import dotenv from "dotenv" ; 
 
dotenv.config(
    {
        path : '/env'
    }
)



connectDB()





















/*
import express from "express"

const app = express()


async function connectDB (){
    try{
        await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error)=> {
            console.log("ERROR : " , error)
            throw error
        })

        app.listen(pocess.env.PORT , ()=>{
            console.log(`App is listening on PORT  : ${process.env.PORT}`)
        })

    } catch(error){
        console.error("ERROR: " , error)
    }
}

connectDB()
*/