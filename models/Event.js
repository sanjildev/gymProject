const mongoose=require('mongoose')
const Schema=mongoose.Schema
const eventSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    status:{
        type:String,
        enum:["Upcoming","Completed","Cancelled","Postponed"],
        default:"Upcoming"
    },
    imageUrl:String,
    imagePublicId:String
    
},{
        timestamps:true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
eventSchema.virtual('fights',{
    ref:'Fight',
    localField:'_id',
    foreignField:"event"
})
module.exports=mongoose.model("Event",eventSchema)