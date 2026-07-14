const cloudinary=require('cloudinary').v2
const Gym = require("../models/Gym");

exports.createGym = async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      latitude,
      longitude,
      contact,
      email,
      disciplines,
      headCoach,
    } = req.body;
    const imageUrl=req.file ? req.file.path:undefined
    const imagePublicId=req.file ? req.file.filename : undefined
    const gym = await Gym.create({
      name,
      city,
      address,
      latitude,
      longitude,
      contact,
      email,
      disciplines,
      headCoach,
      imageUrl,
      imagePublicId
    });
    res.status(201).json({
      message: "Gym Created Successfully!!",
      data: gym,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    if (gyms.length == 0) {
      return res.status(200).json({
        message: "No Gyms Available",
        data: [],
      });
    }
    res.status(200).json({
      message: "All Gyms fetched Successfully!!",
      data: gyms,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSingleGym = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym) {
      return res.status(404).json({
        message: "No Gym Found With That ID",
      });
    }
    res.status(200).json({
      message: "Single Gym Fetched Successfully!!",
      data: gym,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGym = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      city,
      address,
      latitude,
      longitude,
      contact,
      email,
      disciplines,
      headCoach,
    } = req.body;
    const updatedData={
      name,
      city,
      address,
      latitude,
      longitude,
      contact,
      email,
      disciplines,
      headCoach,
    } 
    if(req.file){
      const existingGym=await Gym.findById(id)
      if(existingGym && existingGym.imagePublicId){
        await cloudinary.uploader.destroy(existingGym.imagePublicId)
      }
      updatedData.imagePublicId=req.file.filename
      updatedData.imageUrl=req.file.path
    }
    const gym = await Gym.findByIdAndUpdate(
      id,
       updatedData
      ,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!gym) {
      return res.status(404).json({
        message: "No Gym Found With That ID",
      });
    }
    res.status(200).json({
      message: " Gym Updated Successfully!!",
      data: gym,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGym = async (req, res) => {
  try {
    const { id } = req.params;
    const existingGym=await Gym.findById(id)
      if(existingGym && existingGym.imagePublicId){
        await cloudinary.uploader.destroy(existingGym.imagePublicId)
      }
    const gym = await Gym.findByIdAndDelete(id);
    if (!gym) {
      return res.status(404).json({
        message: "No Gym Found With That ID",
      });
    }
    res.status(200).json({
      message: " Gym Deleted Successfully!!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
