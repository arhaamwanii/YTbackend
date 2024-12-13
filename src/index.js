import connectDB from "./db/index.js";
import dotenv from "dotenv" ; 
import { app } from "./app.js";
  
dotenv.config(
    {
        path : '/env'
    }
)



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 ) , () => {
        console.log(`App is listening at : ${process.env.PORT}` )
    }
}  , 
console.log("this is working"))
.catch((err) => {
    console.log("MONGO db connect failed ! ! !" , err)
})





















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