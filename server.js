const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')
//Requiring user and admin route
 const userRoutes = require("./routes/user");
 const passwordRoutes = require("./routes/passwordmanager");


dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((con) => {
    console.log("MongoDB Database connected successfully.");
  });





app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
 app.use(passwordRoutes);
 app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log(" the Server is started");
});
