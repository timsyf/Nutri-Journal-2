const Exercise = require("../../models/exercise");
const uuid = require('uuid');

const create = async (req, res) => {
  try {
    const foodData = req.body;
    const food = await Food.create(foodData);
    res.status(201).json(food);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
      res.status(409).json({ error: 'Food with the same name already exists.' });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
};

const listAll = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listOne = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findById( id );
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findOneAndDelete({ id });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found." });
    }
    res.status(200).json({ message: "Exercise deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const exercise = await Exercise.findOneAndUpdate({ id }, updatedData, {
      new: true,
    });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found." });
    }
    res.status(200).json({ message: "Exercise updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  listAll,
  listOne,
  deleteOne,
  updateOne
};