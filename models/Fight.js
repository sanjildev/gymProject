const mongoose=require('mongoose')
const Schema=mongoose.Schema
const fightSchema=new Schema({
    fighterA:{
        type:Schema.Types.ObjectId,
        ref:"Fighter",
        required:true
    },
    fighterB:{
        type:Schema.Types.ObjectId,
        ref:"Fighter",
        required:true
    },
    winner:{
        type:Schema.Types.ObjectId,
        ref:"Fighter"
    },
    method:{
        type:String
    },
    round:{
        type:Number
    },
    finishTime:{
        type:String
    },
    weightClass:{
        type:String
    },
    event:{
        type:Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["Scheduled","Completed","Cancelled"],
        default:"Scheduled"
    }
    
},{
        timestamps:true
    })

module.exports=mongoose.model("Fight",fightSchema)