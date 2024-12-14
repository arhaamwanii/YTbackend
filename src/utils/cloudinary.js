import {v2 as cloudinary} from "cloudinary" 
import fs from "fs"
    // inbuilt file system in node.js 
        // unlink : file gets unliked from the os - delete

// gives us permission to upload files
cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
    });


// FILE UPLOAD
const uplaodOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return "no file path provided"
        // uplaod file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })
        // Succesfull Upload
        console.log("File has been uploaded Succesfully :  " , response.url)
        // gives the url and other stuff to the uplaoded file
        return response
    }catch(error){
        fs.unlinkSync(localFilePath) //remove local file on our server which was temp -- as upload failed
        return null
    }
}
 

export {uplaodOnCloudinary}


// MULTER WILL BE USED TO WRITE MULTER - CAN BE DONE MANUALLY AS WELL
















// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dtddi0fyh', 
//         api_key: '695821328571572', 
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();


// file will come from file system 
// LOCAL FILE : file that is on server
// give the path to the server 
// then we remove it from the server