const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

const locations = require("../db/data/locations");
const route = require("../db/data/routeMap");

router.post("/route", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            
            const {
                from,
                to
            } = req.body;

            const path = route.path(from.toString(), to.toString());

            console.log(path);

            const fullPath = path.map( x => {
                console.log(x);
                return locations.locations.find( y => {
                    console.log(y);
                    return y.id.toString() === x.toString();
                });
            });

            console.log(fullPath);

            res.json(fullPath).sendStatus(200);
        }
      });
});

module.exports = router;
