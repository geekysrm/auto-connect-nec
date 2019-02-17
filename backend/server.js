const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan('combined'));

// Load the env variables
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true
    }
  )
  .then(
    () => {
      console.log("Connected to MongoDB successfully");
    },
    err => {
      console.log("Error in connecting to MongoDB" + err);
    }
  );

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Backend for Autoconnect");
});

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const detailsRoutes = require("./routes/details");
app.use(detailsRoutes);

const locationRoutes = require("./routes/locations");
app.use(locationRoutes);

const routeRoutes = require("./routes/route");
app.use(routeRoutes);

const moneyRoute = require("./routes/money");
app.use(moneyRoute);

const autoNumberRoutes = require("./routes/autoNumber");
app.use(autoNumberRoutes);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
