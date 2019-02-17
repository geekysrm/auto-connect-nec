const express = require('express');
const jwt = require("jsonwebtoken");

// Load the env variables
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const User = require("../db/schema/User");
const Driver = require("../db/schema/Driver");

const getAuthToken = require("../middleware/getAuthToken");

const router = express.Router();

router.post("/addMoney", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const { email, type } = authData;

            const {
                amount
            } = req.body;

            if( type === "user" )
            {
                try
                {
                    const user = await User.findOne({ email });

                    const userAccountBalance = user.money;
                    const userNewAccountBalance = Number(userAccountBalance) + Number(amount);

                    console.log(userNewAccountBalance, amount);

                    await user.set("money", userNewAccountBalance);
                    await user.transactions.push({
                        from: "Self",
                        to: "",
                        amount: Number(amount),
                        timeStamp: Date.now().toString(),
                        operation: "credit"
                    });
                    await user.save();

                    console.log("hello");
                    
                    res.send("Money Transfer Done").sendStatus(200);
                }
                catch(err)
                {
                    res.send(err).sendStatus(500);
                }
            }
            else
            {
                res.sendStatus(403).send("Not a User");
            }
        }
      });
});

router.post("/transfer", getAuthToken, async (req,res) => {

    jwt.verify(req.token, SECRET, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
            const { email, type } = authData;

            const {
                driverEmail,
                amount
            } = req.body;

            if( type === "user" )
            {
                try
                {
                    const user = await User.findOne({ email });
                    const driver = await Driver.findOne({ email: driverEmail });

                    const userAccountBalance = user.money;
                    const driverAccountBalance = driver.money;

                    if(userAccountBalance < amount)
                    {
                        res.send("Insufficient Balance").sendStatus(403);
                    }

                    const userNewAccountBalance = Number(userAccountBalance) - Number(amount);
                    const driverNewAccountBalance = Number(driverAccountBalance) + Number(amount);

                    await user.set("money", userNewAccountBalance);
                    await driver.set("money", driverNewAccountBalance);
                    await user.transactions.push({
                        from: "",
                        to: driverEmail,
                        amount: Number(amount),
                        timeStamp: Date.now().toString(),
                        operation: "debit"
                    });
                    await driver.transactions.push({
                        from: email,
                        to: "",
                        amount: Number(amount),
                        timeStamp: Date.now().toString(),
                        operation: "credit"
                    })
                    await user.save();
                    await driver.save();

                    res.send("Money Transfer Done").sendStatus(200);

                }
                catch(err)
                {
                    res.send(err).sendStatus(500);
                }
            }
            else
            {
                res.sendStatus(403).send("Not a User");
            }
        }
      });
});

module.exports = router;
