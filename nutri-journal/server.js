const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

// Always require and configure near the top 
require('dotenv').config();

// Connect to the database
require('./config/database');

var exercisesRouter = require('./routes/api/exercise');
var foodsRouter = require('./routes/api/food');
var mealsRouter = require('./routes/api/mealRegimen');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Check for token in Authorization header or query string
/*const checkToken = (req, res, next) => {
  const token = req.headers['authorization'] || req.query.token;
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
  next();
};*/

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
//app.get('/*', function(req, res) {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
//app.use(checkToken);

app.use('/exercise', exercisesRouter);
app.use('/food', foodsRouter);
app.use('/meal', mealsRouter);

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});