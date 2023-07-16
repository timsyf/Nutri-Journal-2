const logger = require('morgan');

// Always require and configure near the top 
require('dotenv').config();

// Connect to the database
require('./config/database');