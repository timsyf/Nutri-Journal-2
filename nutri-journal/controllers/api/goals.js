const Food = require("../../models/goal");

const create = async (req, res) => {
  try {
    const foodData = req.body;
    const food = await Food.create(foodData);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
};