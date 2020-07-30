const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const Password = require("../models/passmodel");

router.post('/savepassword',auth,(req,res)=>{
 let { password, sitename,username, createdbyID } = req.body;
 
 let passwordData = {
   sitename,
   username,
   password,
   createdbyID,
 };

   
  Password.create(passwordData)
    .then((password) => {
      res.json("success");
    })
    .catch((err) => {
      res.json("failure");
    });

});

router.post("/deletepassword", auth, (req, res) => {
  let { ID } = req.body;
  Password.findByIdAndDelete(ID)
    .then((pass) => {
      res.json("success");
    })
    .catch((err) => {
      res.json("error");
    });
});

router.get("/getpassword", auth, (req, res) => {
  Password.find({})
    .then((password) => {
      res.json(password);
    })
    .catch((err) => {
      res.json("error");
    });
});

router.get("/:id",auth,(req,res)=>{
  let ID = req.params.id;
  Password.findById(ID)
  .then(password =>{
    res.json(password);
  }).catch(err=>{
    res.json('Error');
  });
});

router.put("/edit/:id", auth, (req, res) => {
  let ID = req.params.id;
  let data = req.body;
  Password.findByIdAndUpdate(ID, {
    sitename: data.sitename,
    username: data.username,
    password: data.password,
  })
    .then((pass) => {
      res.json("success");
    })
    .catch((err) => {
      res.json("failure");
    });
});

module.exports = router;