const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema

const usercourseSchema = new Schema({

    userId:{
        type:String,
        required:true
    },
    courseId:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
        
    },

    title:{
        type:String,
        required:true
        
    },
    exp:{
        type:String,
        required:true,
        
    },
    author:{
        type:String,
        required:true,
        
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
   
},{timestamps:true})


module.exports = mongoose.model("NewuserCourse",usercourseSchema)