const router = require("express").Router();
let User = require("../models/user.model");
const mongoose = require("mongoose");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = user.username;
      user.password = user.password;
      user.popArray = req.body.popArray;
      user.visionBoardArray = req.body.visionBoardArray;
      user.visionArray = req.body.visionArray;
      user
        .save()
        .then(() => res.json("User data Updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const popArray = [
    {
      id: "1",
      popMessage: "Thankyou, Hope you enjoy the App. :)",
      backColor: "#e1bee7"
    }
  ];
  const visionBoardArray = [""];
  const visionArray = [""];
  const newUser = new User({
    username,
    password,
    popArray,
    visionBoardArray,
    visionArray
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
