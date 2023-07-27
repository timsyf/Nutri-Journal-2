const WeightLog = require("../../models/weightLog");

const create = async (req, res) => {
  try {
    const weightData = req.body;
    const weight = await WeightLog.create(weightData);
    res.status(201).json(weight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkIfDateExists = async (req, res) => {
  try {
    const { date } = req.query;

    const existingLog = await WeightLog.findOne({ date: new Date(date) });

    if (existingLog) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking the date.' });
  }
};

const getByDate = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const weightLogs = await WeightLog.find({
      date: {
        $gte: start,
        $lte: end,
      },
      userId: userId,
    });

    res.status(200).json(weightLogs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking the date range.' });
  }
};

const deleteWeight = async (req, res) => {
  try {
    const { date } = req.query;

    const existingLog = await WeightLog.findOne({ date: new Date(date) });

    if (existingLog) {
      await WeightLog.deleteOne({ date: new Date(date) });
      res.status(200).json({ deleted: true });
    } else {
      res.status(200).json({ deleted: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the weight log.' });
  }
};

module.exports = {
  create,
  checkIfDateExists,
  getByDate,
  deleteWeight,
};