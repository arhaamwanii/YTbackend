const asyncHanlder = (fn) => {async (req , res , next) => {
    try {
        await fn(req , res , next)
    }catch(error){
        res.status(error.code || 500).json({
            success : false,
            mesage : error.message
        })
    }
}}


export {asyncHanlder} 

export const asyncHandlerPromise = (requestHandler) => {
    (req , res , next ) => {
        Promise.resolve(requestHandler(req,res,next )).catch((err) => next(err))

    }
}