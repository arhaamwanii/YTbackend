// const asyncHanlder = (fn) => {async (req , res , next) => {
//     try {
//         await fn(req , res , next)
//     }catch(error){
//         res.status(error.code || 500).json({
//             success : false,
//             mesage : error.message
//         })
//     }
// }}

// accespts a function as an input




const asyncHandler = (requestHandler) => {
    return (req , res , next ) => {
        Promise.resolve(requestHandler(req,res,next )).catch((err) => next(err))

    }
}

export {asyncHandler}
