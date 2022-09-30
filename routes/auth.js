const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//Authetication
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! ",
    });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);
    password !== req.body.password &&
      res.status(201).json({
        success: false,
        message: "Wrong credentials",
      });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
