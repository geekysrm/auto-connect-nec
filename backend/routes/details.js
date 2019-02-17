const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const User = require("../db/schema/User");
const Driver = require("../db/schema/Driver");

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

router.get("/details", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const { email, type } = authData;

            if( type === "user" )
            {
                try
                {
                    const user = await User.findOne({ email });

                    if(user)
                    {
                        res.json({
                            email: user.email,
                            name: user.name,
                            profilePic: user.profilePic,
                            money: user.money,
                            type: "user",
                            autoNumber: "NA",
                            transactions: user.transactions
                        }).sendStatus(200);
                    }
                    else
                    {
                        res.sendStatus(404);
                    }
                }
                catch(err)
                {
                    console.log(err);
                    res.sendStatus(500);
                }
            }
            else if( type === "driver" )
            {
                try
                {
                    const driver = await Driver.findOne({ email });

                    if(driver)
                    {
                        console.log(driver);

                        res.json({
                            email: driver.email,
                            name: driver.name,
                            profilePic: driver.profilePic,
                            money: driver.money,
                            autoNumber: driver.autoNumber,
                            type: "driver",
                            transactions: driver.transactions
                        }).sendStatus(200);
                    }
                    else
                    {
                        res.sendStatus(404);
                    }
                }
                catch(err)
                {
                    console.log(err);
                    res.sendStatus(500);
                }
            }
        }
      });
});

module.exports = router;
