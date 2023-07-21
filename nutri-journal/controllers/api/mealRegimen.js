const mealRegimen = require("../../models/mealRegimen");

const create = async (req, res) => {
  if (req.body === undefined) {
    res
      .status(400)
      .json({ message: "No meal details has been detected." });
  } else {
    try {
      const meal = await mealRegimen.create(req.body);
      res.status(200).json(meal);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
};

const listAll = async (req, res) => {
  try {
    const meals = await mealRegimen.find();
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listOne = async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await mealRegimen.findById(id);
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