const cloudinary=require('cloudinary').v2
const Event = require("../models/Event")
const Fight = require('../models/Fight')

exports.createEvent=async(req,res)=>{
    try {
    const {name,date,city,venue,latitude,longitude,status}=req.body
    const imageUrl=req.file ? req.file.path:undefined
    const imagePublicId=req.file ? req.file.filename: undefined 
    const event=await Event.create({
      name,date,city,venue,latitude,longitude,status,imageUrl,imagePublicId  
    })
    res.status(201).json({
        message:"Event Created Successfully!!",
        data:event
    })  
    } catch (error) {
     res.status(400).json({ error: error.message });   
    }
    
}



exports.getAllEvents=async(req,res)=>{
    try {
    const events=await Event.find().populate({
  path: 'fights',
  populate: [
    { path: 'fighterA', select: 'name nickname imageUrl' },
    { path: 'fighterB', select: 'name nickname imageUrl' }
  ]
})
    if(events.length==0){
        return res.status(200).json({
            message:"NO Event Available!!",
            data:[]
        })
    } 
    res.status(200).json({
        message:"All Events Fetched Successfully!!",
        data:events
    })   
    } catch (error) {
    res.status(400).json({ error: error.message });     
    }
}



exports.getSingleEvent=async(req,res)=>{
    try {
    const {id}=req.params
    const event=await Event.findById(id).populate({
        path:'fights',
        populate:[
             { path: 'fighterA', select: 'name nickname imageUrl' },
    { path: 'fighterB', select: 'name nickname imageUrl' }
        ]
    })
    if(!event){
        return res.status(404).json({
            message:"NO Event Available with that id!!",
        })
    } 
    res.status(200).json({
        message:"Single Event Fetched Successfully!!",
        data:event
    })   
    } catch (error) {
    res.status(400).json({ error: error.message });     
    }
}


exports.updateEvent=async(req,res)=>{
    try {
        const {id}=req.params
    const {name,date,city,venue,latitude,longitude,status}=req.body
    const updatedEvent={name,date,city,venue,latitude,longitude,status}
    if(req.file){
        const existingEvent=await Event.findById(id)
        if(existingEvent && existingEvent.imagePublicId){
            await cloudinary.uploader.destroy(existingEvent.imagePublicId)
        }
        updatedEvent.imageUrl=req.file.path
        updatedEvent.imagePublicId=req.file.filename
    }
if (status === "Completed") {
  const scheduledFights = await Fight.find({ event: id, status: "Scheduled" });
  if (scheduledFights.length > 0) {
    return res.status(400).json({
      message: "Cannot mark event as completed while fights are still scheduled"
    });
  }
}
    const event=await Event.findByIdAndUpdate(
        id,updatedEvent,{new:true,runValidators:true}
    ).populate({
        path:'fights',
        populate:[
             { path: 'fighterA', select: 'name nickname imageUrl' },
    { path: 'fighterB', select: 'name nickname imageUrl' }
        ]
    })
    if(!event){
        return res.status(404).json({
            message:"No Event With That ID"
        })
    }
    res.status(200).json({
        message:"Event Updated Successfully!!",
        data:event
    })  
    } catch (error) {
     res.status(400).json({ error: error.message });   
    }
    
}



exports.deleteEvent=async(req,res)=>{
    try {
        const {id}=req.params
        const existingEvent=await Event.findById(id)
        if(existingEvent && existingEvent.imagePublicId){
            await cloudinary.uploader.destroy(existingEvent.imagePublicId)
        }
    const event=await Event.findByIdAndDelete(
        id
    )
    if(!event){
        return res.status(404).json({
            message:"No Event With That ID"
        })
    }
    res.status(200).json({
        message:"Event Deleted Successfully!!",
    })  
    } catch (error) {
     res.status(400).json({ error: error.message });   
    }
    
}

