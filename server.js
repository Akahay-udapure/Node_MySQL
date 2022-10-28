const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const db = require("./models/index");

const app = express();

db.sequelize.sync().then(() => {
  console.log("Database connected successfully");
}).catch((error) => {
  console.log('unable to connect databse');
})

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to esparkinfo application." });
});

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
