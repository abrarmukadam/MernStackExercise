const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  User.find({ username: req.body.username })
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
