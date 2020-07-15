const express = require("express");
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");
const sendMail = require("../utils/mail");
const userRoutes = express.Router();

userRoutes.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    sendMail(
      `${req.body.firstName} ${req.body.lastName}`,
      req.body.email,
      req.body.password
    );
    return res.status(200).json({ success: true, userData: doc });
  });
});

userRoutes.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Incorrect Email",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Incorrect Password",
        });
      } else {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("user_authExp", user.tokenExp);
          res
            .cookie("user_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      }
    });
  });
});

userRoutes.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

userRoutes.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = userRoutes;
