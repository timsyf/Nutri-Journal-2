const UserSetUp = require("../../models/userSetUp");

const create = async (req, res) => {
  try {
    const userSetup = req.body;
    const user = await UserSetUp.create(userSetup);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listOneReturnBool = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserSetUp.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ found: false });
    }
    res.status(200).json({ found: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  listOneReturnBool,
};