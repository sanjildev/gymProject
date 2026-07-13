const Fighter = require("../models/Fighter");

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
    const fighter = await Fighter.findByIdAndUpdate(
      id,
      {
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
      },
      {
        new: true,
        runValidators: true,
      },
    );
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
