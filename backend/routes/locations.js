const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

const locations = require("../db/data/locations");

router.get("/location", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            res.json(locations).sendStatus(200);
        }
      });
});

module.exports = router;
