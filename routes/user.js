const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {User,validate}=require("../models/user");




router.post("/signup", async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);
 
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  
  
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const { error } = validatelogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");
   
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send("Invalid email or password.");

   const token = user.generateAuthToken();
   res.send(token);
});

function validatelogin(req) {
  const schema = joi.object({
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;