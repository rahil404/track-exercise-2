// Imports
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Get environment
require('dotenv').config();

// Create express web app, specify port
const app = express();
const port = process.env.PORT || 5000;

// Necessary specifications for functioning
app.use(cors());
app.use(express.json());

// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// API routes
const exercisesRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/api/exercises', exercisesRouter)
app.use('/api/users', userRouter)

// Handler for client build
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("/*", (_, res) => {
     res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}


// Start app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
