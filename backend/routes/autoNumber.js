const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const Driver = require("../db/schema/Driver");

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

router.post("/autoNumber", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const { email, type } = authData;

            const {
                autoNumber
            } = req.body;

            if( type === "driver" )
            {
                try
                {
                    const driver = await Driver.findOne({ email });

                    await driver.set("autoNumber", autoNumber);
                    await driver.save();
                    
                    res.send("Auto Number Added").sendStatus(200);
                }
                catch(err)
                {
                    res.send(err).sendStatus(500);
                }
            }
            else
            {
                res.sendStatus(403).send("Not a Driver");
            }
        }
      });
});

module.exports = router;
