const Food = require("../../models/food");

const create = async (req, res) => {
  if (req.body === undefined) {
    res
      .status(400)
      .json({ message: "No food details has been detected." });
  } else {
    try {
      const food = await Food.create(req.body);
      res.status(200).json(food);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
};

const listAll = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listOne = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  create,
  listAll,
  listOne,
};