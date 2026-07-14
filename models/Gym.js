const mongoose=require('mongoose')
const Schema=mongoose.Schema
const gymSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    disciplines:{
        type:[String]
    },
    headCoach:{
        type:String
    },
    imageUrl:{
        type:String
    },
    imagePublicId:{
        type:String
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Gym',gymSchema)