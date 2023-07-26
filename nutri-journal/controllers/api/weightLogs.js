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
      userId: userId,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    res.status(200).json(weightLogs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking the date range.' });
  }
};

module.exports = {
  create,
  checkIfDateExists,
  getByDate,
};