// thorough express
import express from "express"
import cors from "cors" 
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))   //public asccet that every one can access                                               

app.use(cookieParser()) 


// ROUTES IMPORT

import userRouter from "./routes/user.routes.js"

// routes decalaration
    // app.get w/ when we were writing the contrllers 

app.use("/api/v1/users" , userRouter)

// https://localhost:8000/api/v1/users/{urlin-userRouter}


export {app}