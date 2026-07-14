const Fight = require("../models/Fight")

exports.createFight=async(req,res)=>{
    try {
     const {fighterA,fighterB,event,date,weightClass}=req.body
     if(fighterA===fighterB) {
        return res.status(400).json({
            message:"Fighter A and Fighter B cannot be same"
        })
     } 
     const fight=await Fight.create({
     fighterA,fighterB,event,date,weightClass   
     })
     res.status(201).json({
        message:"Fight Created Successfully!!",
        data:fight
     })
    } catch (error) {
      res.status(400).json({error:error.message})  
    }
}



exports.getAllFights=async(req,res)=>{
    try {
     const fights=await Fight.find().populate("fighterA","name imageUrl weightClass wins losses draws nationality").populate("fighterB","name imageUrl weightClass wins losses draws nationality").populate("event","name date city venue")
     if(fights.length==0){
        return res.status(200).json({
            message:"No Fights Available!!",
            data:[]
        })
     }  
     res.status(200).json({
        message:"All Fights Fetched Successfully!!",
        data:fights
     }) 
    } catch (error) {
     res.status(400).json({error:error.message})    
    }
}


exports.getSingleFight=async(req,res)=>{
    try {
     const {id}=req.params
    const fight=await Fight.findById(id).populate("fighterA","name imageUrl weightClass wins losses draws nationality").populate("fighterB","name imageUrl weightClass wins losses draws nationality").populate("event","name date city venue")
    if(!fight){
        return res.status(404).json({
            message:"NO Fight With That ID!!"
        })
    }
    res.status(200).json({
        message:"Single Fight Fetched Successfully!!",
        data:fight
    })   
    } catch (error) {
       res.status(400).json({error:error.message})   
    }
    
}


exports.updateFight=async(req,res)=>{
    try {
        const {id}=req.params
      const {
    fighterA,
    fighterB,
    winner,
    method,
    round,
    finishTime,
    weightClass,
    event,
    date,
    status
} = req.body;
if (fighterA && fighterB && fighterA === fighterB) {
    return res.status(400).json({ message: "Fighter A & Fighter B Cannot Be Same!!" })
}
if ((status === "Scheduled" || status === "Cancelled") && (winner || method || round || finishTime)) {
  return res.status(400).json({
    message: "Cannot set winner, method, round, or finishTime when status is Scheduled or Cancelled"
  });
}
const fight=await Fight.findByIdAndUpdate(id,{fighterA,
    fighterB,
    winner,
    method,
    round,
    finishTime,
    weightClass,
    event,
    date,
    status},{
        new:true,runValidators:true
    }).populate("fighterA","name imageUrl weightClass wins losses draws nationality").populate("fighterB","name imageUrl weightClass wins losses draws nationality").populate("event","name date city venue") 
    if(!fight){
        return res.status(404).json({
            message:"NO Fight With That ID!!"
        })
    }
    res.status(200).json({
        message:"Fight Updated Successfully!!",
        data:fight
    })    
    } catch (error) {
      res.status(400).json({error:error.message})    
    }
}


exports.deleteFight=async(req,res)=>{
    try {
      const {id}=req.params 
      const fight=await Fight.findByIdAndDelete(id) 
      if(!fight){
        return res.status(404).json({
            message:"NO Fight With That ID!!"
        })
    }
    res.status(200).json({
        message:"Fight Deleted Successfully!!",
        data:fight
    })      
    } catch (error) {
     res.status(400).json({error:error.message})   
    }
}