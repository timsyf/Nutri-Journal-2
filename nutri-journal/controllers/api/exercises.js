const Exercise = require("../../models/exercise");

const create = async (req, res) => {
  if (req.body === undefined) {
    res
      .status(400)
      .json({ message: "No exercise details has been detected." });
  } else {
    try {
      const exercise = await Exercise.create(req.body);
      res.status(200).json(exercise);
    } catch (err) {
      res.status(500).json({ err });
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
    const exercise = await Exercise.findById(id);
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  listAll,
  listOne,
  deleteOne
};