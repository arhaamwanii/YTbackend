import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register" ).post(registerUser)
// router.route("/register" ).post(registerUser)

export default router
// if we export via export default we can name it wahtever we want at import 
    // becuse one file only exports one function 