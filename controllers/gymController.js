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
    const gym = await Gym.findByIdAndUpdate(
      id,
      {
        name,
        city,
        address,
        latitude,
        longitude,
        contact,
        email,
        disciplines,
        headCoach,
      },
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
