const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

// Import Routes
const userRoute= require('./routes/auth');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/user', userRoute);
app.listen(8000, () => console.log("Server Up and running"));
