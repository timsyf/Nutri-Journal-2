const Meal = require("../../models/meal");

const create = async (req, res) => {
  try {
    const mealData = req.body;
    const meal = await Meal.create(mealData);
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listAll = async (req, res) => {
  try {
    const meals = await meal.find();
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listOne = async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await meal.findById(id);
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  create,
  listAll,
  listOne,
};