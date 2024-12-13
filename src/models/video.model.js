import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile : {
            type : String , //cloudnary url 
            required : [true , "Video is Required"]
        } ,
        thumbnail : { 
            type : String , // cloudnary url 
            required : true
        } ,
        title : { 
            type : String , 
            required : true
        } ,
        description : { 
            type : String , 
            required : true
        } ,
        duration : { 
            type : Number ,  //duration will be taken from cloudnary - gives it by deafault 
            required : true ,  
             
        } ,
        views  : { 
            type : Number , 
            default : 0 
        } ,
        isPublished : { 
            type : Boolean , 
            deafault : true  
        } ,
        owner : {
            type : Schema.Types.ObjectId ,
            ref : "User"
        }

} , { timestamps : true }
)

videoSchema.plugin(mongooseAggregatePaginate)
// now we can write aagrregation queries
export const Video = mongoose.model("Video" , videoSchema)


// watch history adds a layer of complexity  
// now