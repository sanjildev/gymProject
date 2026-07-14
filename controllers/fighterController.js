const Fighter = require("../models/Fighter");
const cloudinary=require('cloudinary').v2
exports.createFighter = async (req, res) => {
  try {
    
    const {
      name,
      nickname,
      dob,
      nationality,
      weightClass,
      height,
      reach,
      stance,
      wins,
      losses,
      draws,
      status,
      socialMediaLinks,
      gym,
    } = req.body;
    const imageUrl=req.file ? req.file.path:undefined
    const imagePublicId = req.file ? req.file.filename : undefined;
    const fighter = await Fighter.create({
      name,
      nickname,
      dob,
      nationality,
      weightClass,
      height,
      reach,
      stance,
      wins,
      losses,
      draws,
      status,
      socialMediaLinks,
      gym,
      imageUrl,
      imagePublicId
    });
    res.status(201).json({
      message: "Fighter created successfully!!",
      data: fighter,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.status(200).json({
      message: "All Fighters Fetched Successfully!!",
      data: fighters,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSingleFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const fighter = await Fighter.findById(id);
    if (!fighter) {
      return res.status(404).json({
        message: "Fighter Not Found With That ID",
      });
    }
    res.status(200).json({
      message: "Single Fighter Fetched Successfully!!",
      data: fighter,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      nickname,
      dob,
      nationality,
      weightClass,
      height,
      reach,
      stance,
      wins,
      losses,
      draws,
      status,
      socialMediaLinks,
      gym,
    } = req.body;
const updatedData={name,
      nickname,
      dob,
      nationality,
      weightClass,
      height,
      reach,
      stance,
      wins,
      losses,
      draws,
      status,
      socialMediaLinks,
      gym,}
      if(req.file){
        const existingFighter=await Fighter.findById(id)
        if(existingFighter && existingFighter.imagePublicId){
          await cloudinary.uploader.destroy(existingFighter.imagePublicId)
        }
        updatedData.imageUrl=req.file.path
        updatedData.imagePublicId=req.file.filename
      }
      const fighter=await Fighter.findByIdAndUpdate(id,updatedData,{
        new:true,
        runValidators:true
      })
    if (!fighter) {
      return res.status(404).json({
        message: "Fighter Not Found With That ID",
      });
    }
    res.status(200).json({
      message: "Fighter Updated Successfully!!",
      data: fighter,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const existingFighter=await Fighter.findById(id)
    if(existingFighter && existingFighter.imagePublicId){
      await cloudinary.uploader.destroy(existingFighter.imagePublicId)
    }
    const fighter = await Fighter.findByIdAndDelete(id);
    if (!fighter) {
      return res.status(404).json({
        message: "Fighter Not Found With That ID",
      });
    }
    res.status(200).json({
      message: "Fighter Deleted Successfully!!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
