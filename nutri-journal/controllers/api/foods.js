const Food = require("../../models/food");

const create = async (req, res) => {
  try {
    const foodData = req.body;
    const food = await Food.create(foodData);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const listSearch = async (req, res) => {
  const { _id, name } = req.query;
  const query = {
    ...( _id && { _id } ),
    ...( name && { name: { $regex: new RegExp(name, 'i') } }),
  };

  try {
    const foods = await Food.find(query);
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findOneAndDelete({ id });
    if (!food) {
      return res.status(404).json({ message: "Food not found." });
    }
    res.status(200).json({ message: "Food deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const food = await Food.findOneAndUpdate({ id: id }, updatedData, {
      new: true,
    });
    if (!food) {
      return res.status(404).json({ message: "Food not found." });
    }
    res.status(200).json({ message: "Food updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  listAll,
  listSearch,
  deleteOne,
  updateOne
};