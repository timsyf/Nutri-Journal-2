const UserSetUp = require("../../models/userSetUp");

const create = async (req, res) => {
  try {
    const foodData = req.body;
    const food = await UserSetUp.create(foodData);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
};