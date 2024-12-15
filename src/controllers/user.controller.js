import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req , res) => {
    return res.status(200).json({
        message : "ok"
    })
})

export {registerUser}

// CONTROLLERS ARE WHERE THE BUSSINESS LOGIC IS WRITTEN


// this a controller that sends the ok response once it is called 
// now when in router/routes when a specific method is created it sends a
//  i.e we will call this contrller - when we have to send a ok response 
    // i.e user registered 