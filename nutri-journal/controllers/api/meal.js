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

const listSome = async (req, res) => {
  const { userId } = req.query;

  try {
    const filter = { userId };
    const meals = await Meal.find(filter);
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listSomeWithDates = async (req, res) => {
  const { userId, date } = req.query;

  try {
    let filter = {
      userId,
    };

    if (date && date !== '') {
      filter.date = date;
    }

    const meals = await Meal.find(filter);
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listBasedOnArray = async (req, res) => {
  const { foodIds } = req.query;

  try {
    let filter = {};

    if (foodIds) {
      filter._id = { $in: foodIds };
    }

    const foods = await Food.find(filter);
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteOne = async (req, res) => {
  const { _id } = req.params;
  try {
    const meal = await Meal.findOneAndDelete({ _id });
    if (!meal) {
      return res.status(404).json({ message: "Food not found." });
    }
    res.status(200).json({ message: "Meal deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  const { _id } = req.params;
  const updatedData = req.body;
  try {
    const meal = await Meal.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
    console.log(updatedData);
    if (!meal) {
      return res.status(404).json({ message: "Food not found." });
    }
    res.status(200).json({ message: "Meal updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  listAll,
  listSome,
  deleteOne,
  updateOne,
  listBasedOnArray,
  listSomeWithDates,
};