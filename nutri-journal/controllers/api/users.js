const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

/*async function setDesc(req, res) {
  try {
    // DB Insert operation
    const query = 'INSERT INTO desc_table ("description") VALUES (test) RETURNING *';
    //const values = [userId, userName, hashedPassword, userPfp, userEmail, userPhone, userBlk, userStreet, userUnit, userPostal, userBuildingName, userStatus];
    const result = await pool.query(query);

    const insertedUser = result.rows[0];

    res.status(201).json({
      message: 'User created successfully',
      user: insertedUser
    });
  } catch (error) {
    // Handle any errors that occur during the INSERT operation
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

module.exports = {
  create,
  checkToken,
  createJWT,
  login,
  //setDesc
};