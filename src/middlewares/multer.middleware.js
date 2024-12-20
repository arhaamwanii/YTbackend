import multer from "multer";
// it is written in middleware 
    // it is put between the url and the req , res and next 

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/temp')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
      
export const upload = multer({ storage: storage }) 
//  gives storage middle ware we can now use it directly after this 

// multer is a middle are that handles file uploads